const nodemailer = require("nodemailer");
const appError = require("../error/appError");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.GMAIL_PORT,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});
const middlePara=(template)=>{
    let midString='';
    template.templatePara.forEach(t => {
        midString+=`<p>${t}</p>`
    });
    return midString;
}
const sendCvEmail=async(company,template,user)=>{
    const paras=middlePara(template)
   // console.log(paras)
    const body = `
    <p>${company.hiringManagerName|| "Hiring Manager"}, ${company.companyName}</p>
    <p>Dear Hiring Manager,</p>
    
    <p>I am writing to express my interest in the ${company.positionRole} Internship at ${company.companyName} for the 2024 summer term. I am currently pursuing a Dual Degree (B.Tech + M.Tech) in Mining Engineering at the Indian Institute of Technology (BHU) Varanasi, with a CPI of ${user.cpi||null}. I am enthusiastic about applying my skills and knowledge to contribute to your team while furthering my own professional development.</p>
    
    ${paras}
    
    <p>I am particularly drawn to the ${company.positionRole} internship at ${company.companyName} because it aligns perfectly with my career goals. I am eager to contribute to your team, leveraging my ${company.companyType === 'min' ? "unique combination of software development and mining engineering" : "software development"||null} skills to drive innovative solutions and improve operational efficiency.</p>
    
    <p>Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and interests can contribute to the success of ${company.companyName}. I am excited about the possibility of working with your esteemed organization and am available for an interview at your earliest convenience.</p>
    
    <p>Sincerely,<br>${user.name}</p>
    <p>Sincerely,<br>${user.contactEmail}</p>
    <p>Sincerely,<br>${user.contactNumber}</p>
    `;
    

    //console.log(body)
    try {
//console.log(user.cvUrl)
        const info = await transporter.sendMail({
            from: 'akkr9507@gmail.com', // change to user contact email
            to: company.companyHrContact, // company hr contact
            subject: "internship", // 
            text: "`Please find attached the CV for your reference. ",// plain text body
            html:body, // html body
            attachments: [
                {
                    filename: 'resume.pdf',
                    path: user.cvUrl, // The URL to the user's CV
                    contentType: 'application/pdf'
                }
            ]
        });

        console.log("Message sent: %s", info);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }
    catch (e) {
        console.error(e)
        throw new appError("unable to send email",400)
    }
}



module.exports=sendCvEmail;
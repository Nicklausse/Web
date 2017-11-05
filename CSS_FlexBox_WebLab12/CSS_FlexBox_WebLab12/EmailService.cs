using MimeKit;
using MailKit.Net.Smtp;
using System.Threading.Tasks;
namespace SocialApp.Services
{
    public class EmailService
    {
        public async Task SendEmailAsync(string email, string subject, string text, string admin_email, string admin_password, int smtp_port, string smtp_server)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(email, admin_email));
            emailMessage.To.Add(new MailboxAddress("Администратор сайта", admin_email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = text
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(smtp_server, smtp_port, false);
                await client.AuthenticateAsync(admin_email, admin_password);
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }
    }
}
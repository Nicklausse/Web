using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SocialApp.Services;
using Microsoft.Extensions.Options;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CSS_FlexBox_WebLab12.Controllers
{
    public class ContactController : Controller
    {
        private readonly EmailSettings _options;

        public ContactController(IOptions<EmailSettings> optionsAccessor)
        {
            _options = optionsAccessor.Value;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Send(EmailMessage message)
        {
            var admin_email = _options.AdminEmail;
            var admin_password = _options.AdminPassword;
            var smtp_port = int.Parse(_options.SmtpPort);
            var smtp_server = _options.SmtpServer;

           TryValidateModel(message);

                    EmailService emailService = new EmailService();
                    await emailService.SendEmailAsync(message.Email, message.Subject, message.Text, admin_email, admin_password, smtp_port, smtp_server);

            return RedirectToAction("Index");
        }
    }
}
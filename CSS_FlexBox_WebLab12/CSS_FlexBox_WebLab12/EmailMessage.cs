using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace CSS_FlexBox_WebLab12
{
    public class EmailMessage
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [StringLength(50)]
        public string Subject { get; set; }

        [Required]
        [StringLength(2000)]
        public string Text { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace Sample.React.AspNet.Model;

public class LoginModel
{
    [Required]
    public string UserName { get; set; } = string.Empty;
}

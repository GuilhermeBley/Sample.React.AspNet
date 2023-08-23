using Microsoft.AspNetCore.Mvc;
using Sample.React.AspNet.Model;
using Sample.React.AspNet.Services;
using System.Security.Claims;

namespace Sample.React.AspNet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly IAuthService _authService;

    public LoginController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost]
    public async Task<ActionResult<TokenResponse>> Login(LoginModel model)
    {
        var claimUserName = new Claim(ClaimTypes.Name, model.UserName);

        var claims = new Claim[] { claimUserName };

        return await Task.FromResult(Ok(
            new TokenResponse
            {
                Token = _authService.GenerateToken(claims)
            }));
    }
}
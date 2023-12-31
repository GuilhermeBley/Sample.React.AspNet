﻿using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Sample.React.AspNet.Services;

public interface IAuthService
{
    string GenerateToken(Claim[] claims);
}

public class JwtAuthService : IAuthService
{
    public const string KEY = "this is my custom Secret key for authentication";

    public JwtAuthService()
    {
    }

    public string GenerateToken(Claim[] claims)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var keyEncoded = Encoding.UTF8.GetBytes(KEY);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(12),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyEncoded), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}

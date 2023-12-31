using Sample.React.AspNet.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddSingleton<IAuthService, JwtAuthService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors(cfg =>
{
    cfg.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
});

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "api/{controller=Home}/{action=Index}/{id?}");
});

app.MapFallbackToFile("index.html");

app.Run();

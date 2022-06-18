using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.IO;
using EnvironmentName = Microsoft.AspNetCore.Hosting.EnvironmentName;

namespace Als.Extranet.Front
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
        }

        private static bool IsDevelopmentWebHost(IWebHostEnvironment env)
        {
            return env.EnvironmentName == EnvironmentName.Development;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            env.WebRootPath = "wwwroot/dist";
            if (IsDevelopmentWebHost(env))
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseDefaultFiles();
            var frontendConfigurationFile = Environment.GetEnvironmentVariable("Dummy") != null ? "config.dummy.json" : "config.json";
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/config/config.json", async context =>
                {
                    await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "config", frontendConfigurationFile));
                });
            });

            app.UseStaticFiles();
            app.Run(async (context) =>
            {
                context.Response.ContentType = "text/html";
                await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
            });
        }
    }
}

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;

namespace Als.Extranet.Front
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(builder =>
                {
                    builder.ConfigureAppConfiguration((host, configurationBuilder) =>
                    {
                        var isDummy = Environment.GetEnvironmentVariable("Dummy") != null;
                        if (isDummy) configurationBuilder.AddJsonFile($"appsettings.dummy.json", optional: true, reloadOnChange: true);
                    });
                    builder.UseKestrel();
                    builder.UseStartup<Startup>();
                })
                .Build()
                .Run();
        }
    }
}

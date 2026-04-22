using Microsoft.EntityFrameworkCore;
using RawMaterialTracker.Data;
using RawMaterialTracker.Services;

var builder = WebApplication.CreateBuilder(args);

// 追加（SQLiteを使う場合）
builder.Services.AddDbContext<RawMaterialContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("RawMaterialContext") 
    ?? throw new InvalidOperationException("Connection string not found.")));

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
    );

// Add services to the container.
builder.Services.AddScoped<MaterialService>();
builder.Services.AddScoped<StockItemService>(); 
builder.Services.AddScoped<JobService>(); 
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// CORS設定
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Viteのデフォルトポート
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<RawMaterialContext>();
        DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "データベースの初期化中にエラーが発生しました。");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// CORSを有効にする（RoutingとAuthorizationの間がベスト）
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();

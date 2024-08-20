using GraphQlBackend.GraphQlRootTypes;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});


builder.Services
    .AddGraphQLServer()
    .AddType<UploadType>()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddSubscriptionType<Subscription>()
    .AddInMemorySubscriptions()
    .ModifyRequestOptions(
        x => x.IncludeExceptionDetails = true
    );

var app = builder.Build();
app.UseCors("AllowAll");

app.MapGraphQL();

app.Run();
# Build stage (SDK 9 patched)
FROM mcr.microsoft.com/dotnet/sdk:9.0.201 AS build
WORKDIR /src

COPY ["Comments.Api.csproj", "./"]
RUN dotnet restore "./Comments.Api.csproj"

COPY . .
RUN dotnet publish "Comments.Api.csproj" -c Release -o /app/publish

# Runtime stage (ASP.NET Core 9)
FROM mcr.microsoft.com/dotnet/aspnet:9.0.11 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Comments.Api.dll"]

﻿CREATE TABLE [dbo].[Agents]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] NVARCHAR(50) NOT NULL, 
    [Address] NVARCHAR(50) NOT NULL, 
    [EnviromentId] INT NOT NULL, 
    CONSTRAINT [FK_Agents_ToEnviromens] FOREIGN KEY ([EnviromentId]) REFERENCES [Enviroments]([Id])
)

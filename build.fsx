#r @"packages\FAKE.4.63.2\tools\FakeLib.dll"

#load @"..\WebSharper.Community.Build\gloabalSettings.fsx"
#load "tools/settings.fsx"

open Fake
open Fake.AssemblyInfoFile

let projectFullName = "WebSharper.Community." + Settings.projectName
let buildDir  = @".\" + projectFullName + @"\bin\"
let packagingRoot  = @".\Publish\"
let packagingDir  = packagingRoot  + @"lib\net46\"
let allPackageFiles = [buildDir+"Release/" + projectFullName + ".dll"]
let projectDescription = Settings.projectDescription
let projectSummary = ""
let buildVersion = globalSettings.version

Target "CreatePackage" (fun _ ->
    // Copy all the package files into a package folder
    CopyFiles packagingDir allPackageFiles

    NuGet (fun p -> 
        {p with
            Authors = ["Andrei Degtiarev"]
            Project = projectFullName
            Description = projectDescription                               
            OutputPath = packagingRoot
            Summary = projectSummary
            Tags = "WebSharper, F#, Extension, " + Settings.projectName
            WorkingDir = packagingRoot
            Version = buildVersion
            AccessKey = globalSettings.accessKey
            ReleaseNotes = globalSettings.releaseNotes + " " + Settings.releaseNotes
            Dependencies =  Settings.dependencies |> List.map (fun (packageName,version) -> packageName, if version.Length = 0 then GetPackageVersion "./packages/" packageName else version)
            Files = [( @"lib\net46\" + projectFullName + ".dll", Some @"lib\net46\", None)]
            Publish = globalSettings.publish }) 
            "project.nuspec"
)
"CreatePackage"
//  ==> "CreatePackage"

RunTargetOrDefault "CreatePackage"
//contains logic for launching the project
import { SpaceStack } from "./SpaceStack";
import { App } from 'aws-cdk-lib'

const app = new App()
new SpaceStack(app,'Space-finder',{
    stackName: 'SpaceFinder'
})

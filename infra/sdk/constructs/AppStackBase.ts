import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as git from 'git-rev-sync';

// this construct serves as the base definition for an application stack
// that all application stacks should share
// it extends the base cdk.Stack, which itself extends the base Construct

export interface AppStackBaseProps extends cdk.StackProps {
    stackName: string;
    owner?: string;
}

export class AppStackBase extends cdk.Stack {
    constructor(scope: Construct, props: AppStackBaseProps) {
        super(scope, props.stackName, props);
        this.tags.setTag('git_sha', git.short());
    }

    static resolveStackSuffix(app: cdk.App) {
        let username = String(process.env.LOGNAME).toLowerCase();

        if (username.indexOf('@') >= 0) {
            username = username.slice(0, username.indexOf('@'));
        }
        username = username.replace(/\./g, '');

        return app.node.tryGetContext('stack-suffix') ?? username;
    }
}

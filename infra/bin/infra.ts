#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {BenchDoomClockStack} from "../cdk/bench-doom-click-stack";
import {AppStackBase} from "../sdk/constructs/AppStackBase";

const app = new cdk.App();

const suffix = AppStackBase.resolveStackSuffix(app);

new BenchDoomClockStack(app, {
    description: `Stack for ${process.env.LOGNAME}`,
    // Add user here
    stackName: `${suffix}`,

    // Try this out Tim
    // const deployer = this.node.tryGetContext('deployer');
    // if (deployer) {
    //     cdk.Tags.of(this).add('Deployer', deployer);
    // }


  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});


// Also do this
// cdk.Tags.of(stack).add('owner', process.env.LOGNAME ?? 'unknown');
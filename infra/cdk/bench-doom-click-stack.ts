import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {BlockPublicAccess, BucketAccessControl} from "@aws-cdk/aws-s3";
import {BucketDeployment, Source} from "aws-cdk-lib/aws-s3-deployment";
import {SITES_ROOT} from "./appPaths";
import {CfnOutput} from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront"
export interface BenchDoomClockStackBaseProps extends cdk.StackProps {
    stackName: string;
    owner?: string;
}
export class BenchDoomClockStack extends cdk.Stack {
    constructor(scope: Construct, props: BenchDoomClockStackBaseProps) {
        super(scope, props.stackName, props);

        const bucketId = 'bench-doom-clock'

        const bucket = new cdk.aws_s3.Bucket(this, bucketId, {
            publicReadAccess: false,
            blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
            accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'index.html',
        });

        new BucketDeployment(this, 'test-bucket-deployment-thingy', {
            sources: [Source.asset(`${SITES_ROOT}/doom-clock/build`)],
            destinationBucket: bucket
        });

        new CfnOutput(this, 'WebsiteURL',  {
            value: bucket.bucketWebsiteUrl,
            description: 'URL of the website',
        });


        const distribution = new cloudfront.CloudFrontWebDistribution(this, 'my-cloud-front-thingy', {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: bucket,
                    },
                    behaviors : [ {isDefaultBehavior: true}],
                },
            ],
        });

        new CfnOutput(this, 'what we got here?', {
            value: distribution.distributionDomainName,
        })


    }
}
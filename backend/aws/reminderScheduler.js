import { EventBridge } from "@aws-sdk/client-eventbridge";

export const handler = async (data) => {
  var eventBridge = new EventBridge({
    apiVersion: "2015-10-07",
    region: process.env.region,
    credentials: {
      accessKeyId: process.env.accessKey,
      secretAccessKey: process.env.secretKey,
    },
  });

  const ruleName = data.ruleName ? data.ruleName : `reminder-scheduler-${Date.now()}`;
  const time = data.time.split(":");
  let hour = (parseInt(time[0]) + 18) % 24;
  let minute = parseInt(time[1]) + 30;
  if (minute > 60) (minute %= 60), (hour = (hour + 1) % 24);
  const cron = `cron(${minute} ${hour} * * ? *)`;
  var params = {
    Name: ruleName,
    ScheduleExpression: cron,
    State: "ENABLED",
    Description: "Scheduled reminder event",
  };

  try {
    const ruleResponse = await eventBridge.putRule(params);

    var targetParams = {
      Rule: ruleName,
      Targets: [
        {
          Id: "sendReminder",
          Arn: "arn:aws:lambda:us-east-1:620740361594:function:LogScheduledEvents",
          Input: JSON.stringify(data),
        },
      ],
    };
    const targetResponse = await eventBridge.putTargets(targetParams);
    console.log(targetResponse, ruleResponse);
    return {
       ...data , ruleName
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
    };
  }
};

# Test POC

This is still pretty raw, but I hope it's enough for understanding what I was trying to say.

## Structure

```
. 
.wdio-test -> Source code of e2e tests
.helm -> package of the app that includes tests
```

## Idea

Let's pretend that our application is nginx and we want to run e2e tests againse its default page. You should be able to find it here: https://nginx.badhouseplants.net

In this example everything is packaged in Helm, but it can also be Kustomize, it's not the most important part. 

In the `./helm/test-selenoid` there is a helm chart test-selenoid, it's a cronjob that contains 3 containers:

1. e2e test
2. selenoid 
3. docker-in-docker

The main container there is e2e-test, once it's executed successfully, job is marked as completed. 

This chart is added to main app's dependencies, because it should more-or-less the same everywhere, the only difference is the e2e-test container, so for each project it will be replaced with a desired one. Also, if a test is an app dependency, it's easier to track versions and also it's possible to set some variables in one place. For example, APP_URL that is set in the target helm chart: `./helm/nginx/values.yaml:global.env.APP_URL` is also reused by tests.

And even though it's mostly related to helm, I guess it also might be transfered to Kustomize. 

After this application is deployed, e2e tests will be automatically executed by a cronjob.

Then the only thing that's missing is manual test run. It can be done by creating a job from a cronjob

```shell
# -- Kubectl example 
$ kubectl create job --from cronjob/nginx-test-selenoid debug
```

And it would mean that we can create this job from code without managing k8s resource in the code. 

Why do I think it's better than creating resource directly from Java code. Because after all the team that is mostly responsible for K8s doesn't write JAVA code, and when something is failed in k8s, DevOps are usually asked first. That would mean that DevOps might have to go to k8s, find the failed job, and try to figure out where it's coming from. And the path to the Java project will be very long, but even after the reason is found, it would mean that somebody has to fix this issue in the code, release a new version and only then the issue could be gone.

With this approach it could just be a new release of an gitops setup that can be tracked from the argocd.

Deploying Pucora in Kubernetes requires a straightforward configuration.

Create a `Dockerfile` that includes the configuration of the service. Read how to generate a [Docker artifact](/docs/deploying/docker/) for detailed instructions. You could also use a ConfigMap, although the recommendation is to use immutable artifacts.

From here you need to create a `NodePort` and send all the traffic to Pucora.

> **Run as user 1000**
>
> Whether you run Pucora on Kubernetes, OpenShift, or any other platform with the capability to run the container as a specific user UID, make sure you use the **UID 1000**

## Deployment definition YAML
The Pucora `deployment` definition, in a file called `deployment-definition.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pucora-deployment
spec:
  selector:
    matchLabels:
      app: pucora
  replicas: 2
  template:
    metadata:
      labels:
        app: pucora
    spec:
      containers:
      - name: pucora
        image: YOUR-PUCORA-IMAGE:1.0.0
        ports:
        - containerPort: 8080
        imagePullPolicy: Never
        command: [ "/usr/bin/pucora" ]
        args: [ "run", "-d", "-c", "/etc/pucora/pucora.json", "-p", "8080" ]
        securityContext:
          allowPrivilegeEscalation: false
          runAsNonRoot: true
          runAsUser: 1000
          readOnlyRootFilesystem: true
          capabilities:
            drop:
              - ALL
            add:
              - NET_BIND_SERVICE
        env:
        - name: PUCORA_PORT
          value: "8080"
```

## Service definition yaml

The Pucora `service` definition, in a file called `service-definition.yaml`:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: pucora-service
spec:
  type: NodePort
  ports:
  - name: http
    port: 8000
    targetPort: 8080
    protocol: TCP
  selector:
    app: pucora
```

## Registering the service

Using the `kubectl` command:



**Register deployment**

```bash
kubectl create -f deployment-definition.yaml
```




**Register service**

```bash
kubectl create -f service-definition.yaml
```


For a more step by step process see [this blog entry](/blog/pucora-on-kubernetes/).

## Helm Chart

The recommended way to deploy on Kubernetes is the **official Helm chart** shipped with Pucora CE.

It includes Deployment, Service, health probes, optional Ingress, HPA, PDB, Prometheus integration, and three configuration modes (ConfigMap, Secret, or immutable image).






Quick install:



**Helm install**

```bash
git clone https://github.com/pucora/pucora-ce.git
cd pucora-ce
helm install my-gateway ./deploy/helm/pucora
kubectl port-forward svc/my-gateway-pucora 8080:8080
curl http://localhost:8080/__health
helm test my-gateway
```


For production values, OCI installs, upgrades, and GitOps patterns, see the [Deploy Pucora with the Helm Chart](/docs/deploying/helm/) guide.
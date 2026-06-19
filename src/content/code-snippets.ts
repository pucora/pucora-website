export const codeSnippets = {
  dockerRun: 'docker run -p 8080:8080 niteesh20/pucora:2.0.0 run -c /etc/pucora/pucora.json',
  dockerPull: 'docker pull niteesh20/pucora:2.0.0',
  binaryRun: './pucora run -c pucora.json',
  binaryBuild: 'make build',
  healthCheck: 'curl http://localhost:8080/__health',
  configuratorInit: './bin/pucora-config init -o my-profile.yaml',
  configuratorPreset: './bin/pucora-config presets apply kafka-pubsub -g ./output --compose',
  configuratorGenerate: './bin/pucora-config generate -f my-profile.yaml -o ./output',
  configuratorValidate: './bin/pucora-config validate -f my-profile.yaml',
  configCheck: 'pucora check -c ./output/pucora.json',
} as const

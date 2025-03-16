import React, { useState, useCallback } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState,
  addEdge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import TechnologyNode from './TechnologyNode';
import CategoryNode from './CategoryNode';
import SubCategoryNode from './SubCategoryNode';

// Import tech logos
const techLogos = {
  react: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Dark.svg",
  reactNative: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Dark.svg",
  redux: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Redux.svg",
  graphql: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/GraphQL-Dark.svg",
  swift: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Swift.svg",
  kotlin: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Kotlin-Dark.svg",
  django: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Django.svg",
  gunicorn: "https://raw.githubusercontent.com/ServiceStack/Assets/master/img/livedemos/techstacks/gunicorn-logo.png",
  postgres: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/PostgreSQL-Dark.svg",
  cassandra: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Cassandra_logo.svg/1200px-Cassandra_logo.svg.png",
  memcached: "https://miro.medium.com/v2/resize:fit:1400/1*nautKVzRYdwRmIUtWJmlLw.png",
  kafka: "https://scalac.io/wp-content/uploads/2021/02/FB_Post-Size-link-image-size-5.jpg",
  rabbitmq: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJknhBbaPFe3N0yAYkx_-I5wI7vjp6qVT8YQ&s",
  haystack: "https://haystack.deepset.ai/images/logos/haystack.png",
  blob: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Azure-Dark.svg",
  spark: "https://spark.apache.org/images/spark-logo-trademark.png",
  flink: "https://flink.apache.org/favicon.ico",
  scuba: "https://cdn-icons-png.flaticon.com/512/826/826981.png",
  presto: "https://prestodb.io/wp-content/uploads/site-image.png",
  automl: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/TensorFlow-Dark.svg",
  tensorflow: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/TensorFlow-Dark.svg",
  pytorch: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/PyTorch-Dark.svg",
  torchserve: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/PyTorch-Dark.svg",
  llama: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkrpzVuAwB9jgnht0pbVpb5gTW_PHpeN_qmg&s",
  faiss: "https://a.fsdn.com/allura/s/faiss/icon?4d871df26f0b83b1bc7af640b5a521fddd8254175984002102059076b98d5e97?&w=148",
  kubernetes: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Kubernetes.svg",
  docker: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Docker.svg",
  jenkins: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Jenkins-Dark.svg",
  prometheus: "https://prometheus.io/assets/favicons/favicon.ico",
  grafana: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Grafana-Dark.svg",
  elastic: "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*eoHoamtqYxufC386.png",
  logstash: "https://www.netdata.cloud/img/elastic-logstash.svg",
  kibana: "https://www.elastic.co/favicon.ico"
};

// Define the initial nodes
const initialNodes = [
  {
    id: 'frontend',
    type: 'category',
    data: { label: 'Frontend', type: 'frontend' },
    position: { x: 250, y: 50 }
  },
  {
    id: 'frontend-api',
    type: 'subcategory',
    data: { label: 'API', type: 'frontend' },
    position: { x: 450, y: 0 }
  },
  {
    id: 'frontend-mobile',
    type: 'subcategory',
    data: { label: 'Mobile', type: 'frontend' },
    position: { x: 450, y: 60 }
  },
  {
    id: 'frontend-web',
    type: 'subcategory',
    data: { label: 'Web', type: 'frontend' },
    position: { x: 450, y: 120 }
  },
  {
    id: 'graphql',
    type: 'technology',
    data: { label: 'GraphQL', icon: techLogos.graphql, type: 'frontend' },
    position: { x: 600, y: 0 }
  },
  {
    id: 'swift',
    type: 'technology',
    data: { label: 'Swift', icon: techLogos.swift, type: 'frontend' },
    position: { x: 600, y: 60 }
  },
  {
    id: 'reactnative',
    type: 'technology',
    data: { label: 'React Native', icon: techLogos.reactNative, type: 'frontend' },
    position: { x: 700, y: 60 }
  },
  {
    id: 'kotlin',
    type: 'technology',
    data: { label: 'Kotlin', icon: techLogos.kotlin, type: 'frontend' },
    position: { x: 800, y: 60 }
  },
  {
    id: 'redux',
    type: 'technology',
    data: { label: 'Redux', icon: techLogos.redux, type: 'frontend' },
    position: { x: 600, y: 120 }
  },
  {
    id: 'react',
    type: 'technology',
    data: { label: 'React', icon: techLogos.react, type: 'frontend' },
    position: { x: 700, y: 120 }
  },
  
  // Backend nodes
  {
    id: 'backend',
    type: 'category',
    data: { label: 'Backend', type: 'backend' },
    position: { x: 250, y: 250 }
  },
  {
    id: 'backend-services',
    type: 'subcategory',
    data: { label: 'Services', type: 'backend' },
    position: { x: 450, y: 200 }
  },
  {
    id: 'backend-databases',
    type: 'subcategory',
    data: { label: 'Databases', type: 'backend' },
    position: { x: 450, y: 260 }
  },
  {
    id: 'backend-messaging',
    type: 'subcategory',
    data: { label: 'Messaging/Streaming', type: 'backend' },
    position: { x: 450, y: 320 }
  },
  {
    id: 'django',
    type: 'technology',
    data: { label: 'Django', icon: techLogos.django, type: 'backend' },
    position: { x: 600, y: 200 }
  },
  {
    id: 'gunicorn',
    type: 'technology',
    data: { label: 'Gunicorn', icon: techLogos.gunicorn, type: 'backend' },
    position: { x: 700, y: 200 }
  },
  {
    id: 'postgres',
    type: 'technology',
    data: { label: 'PostgreSQL', icon: techLogos.postgres, type: 'backend' },
    position: { x: 600, y: 260 }
  },
  {
    id: 'cassandra',
    type: 'technology',
    data: { label: 'Cassandra', icon: techLogos.cassandra, type: 'backend' },
    position: { x: 700, y: 260 }
  },
  {
    id: 'memcached',
    type: 'technology',
    data: { label: 'Memcached', icon: techLogos.memcached, type: 'backend' },
    position: { x: 800, y: 260 }
  },
  {
    id: 'rabbitmq',
    type: 'technology',
    data: { label: 'RabbitMQ', icon: techLogos.rabbitmq, type: 'backend' },
    position: { x: 600, y: 320 }
  },
  {
    id: 'kafka',
    type: 'technology',
    data: { label: 'Apache Kafka', icon: techLogos.kafka, type: 'backend' },
    position: { x: 700, y: 320 }
  },
  
  // Data nodes
  {
    id: 'data',
    type: 'category',
    data: { label: 'Big Data', type: 'data' },
    position: { x: 250, y: 450 }
  },
  {
    id: 'data-storage',
    type: 'subcategory',
    data: { label: 'Data Storage', type: 'data' },
    position: { x: 450, y: 400 }
  },
  {
    id: 'data-processing',
    type: 'subcategory',
    data: { label: 'Data Processing', type: 'data' },
    position: { x: 450, y: 460 }
  },
  {
    id: 'haystack',
    type: 'technology',
    data: { label: 'Haystack', icon: techLogos.haystack, type: 'data' },
    position: { x: 600, y: 400 }
  },
  {
    id: 'blob',
    type: 'technology',
    data: { label: 'Blob Storage', icon: techLogos.blob, type: 'data' },
    position: { x: 700, y: 400 }
  },
  {
    id: 'spark',
    type: 'technology',
    data: { label: 'Apache Spark', icon: techLogos.spark, type: 'data' },
    position: { x: 600, y: 460 }
  },
  {
    id: 'flink',
    type: 'technology',
    data: { label: 'Apache Flink', icon: techLogos.flink, type: 'data' },
    position: { x: 700, y: 460 }
  },
  {
    id: 'scuba',
    type: 'technology',
    data: { label: 'Scuba', icon: techLogos.scuba, type: 'data' },
    position: { x: 800, y: 460 }
  },
  {
    id: 'presto',
    type: 'technology',
    data: { label: 'Presto', icon: techLogos.presto, type: 'data' },
    position: { x: 900, y: 460 }
  },
  
  // ML nodes
  {
    id: 'ml',
    type: 'category',
    data: { label: 'Machine Learning & AI', type: 'ml' },
    position: { x: 250, y: 600 }
  },
  {
    id: 'ml-frameworks',
    type: 'subcategory',
    data: { label: 'Frameworks', type: 'ml' },
    position: { x: 450, y: 550 }
  },
  {
    id: 'ml-tools',
    type: 'subcategory',
    data: { label: 'Tools', type: 'ml' },
    position: { x: 450, y: 610 }
  },
  {
    id: 'automl',
    type: 'technology',
    data: { label: 'AutoML', icon: techLogos.automl, type: 'ml' },
    position: { x: 600, y: 550 }
  },
  {
    id: 'tensorflow',
    type: 'technology',
    data: { label: 'TensorFlow', icon: techLogos.tensorflow, type: 'ml' },
    position: { x: 700, y: 550 }
  },
  {
    id: 'pytorch',
    type: 'technology',
    data: { label: 'PyTorch', icon: techLogos.pytorch, type: 'ml' },
    position: { x: 600, y: 610 }
  },
  {
    id: 'torchserve',
    type: 'technology',
    data: { label: 'TorchServe', icon: techLogos.torchserve, type: 'ml' },
    position: { x: 700, y: 610 }
  },
  {
    id: 'llama',
    type: 'technology',
    data: { label: 'Llama 3', icon: techLogos.llama, type: 'ml' },
    position: { x: 800, y: 610 }
  },
  {
    id: 'faiss',
    type: 'technology',
    data: { label: 'FAISS', icon: techLogos.faiss, type: 'ml' },
    position: { x: 900, y: 610 }
  },
  
  // DevOps nodes
  {
    id: 'devops',
    type: 'category',
    data: { label: 'DevOps & CI/CD', type: 'devops' },
    position: { x: 250, y: 750 }
  },
  {
    id: 'devops-tools',
    type: 'subcategory',
    data: { label: 'Tools', type: 'devops' },
    position: { x: 450, y: 700 }
  },
  {
    id: 'devops-monitoring',
    type: 'subcategory',
    data: { label: 'Monitoring', type: 'devops' },
    position: { x: 450, y: 760 }
  },
  {
    id: 'devops-logging',
    type: 'subcategory',
    data: { label: 'Logging', type: 'devops' },
    position: { x: 450, y: 820 }
  },
  {
    id: 'kubernetes',
    type: 'technology',
    data: { label: 'Kubernetes', icon: techLogos.kubernetes, type: 'devops' },
    position: { x: 600, y: 700 }
  },
  {
    id: 'docker',
    type: 'technology',
    data: { label: 'Docker', icon: techLogos.docker, type: 'devops' },
    position: { x: 700, y: 700 }
  },
  {
    id: 'jenkins',
    type: 'technology',
    data: { label: 'Jenkins', icon: techLogos.jenkins, type: 'devops' },
    position: { x: 800, y: 700 }
  },
  {
    id: 'prometheus',
    type: 'technology',
    data: { label: 'Prometheus', icon: techLogos.prometheus, type: 'devops' },
    position: { x: 600, y: 760 }
  },
  {
    id: 'grafana',
    type: 'technology',
    data: { label: 'Grafana', icon: techLogos.grafana, type: 'devops' },
    position: { x: 700, y: 760 }
  },
  {
    id: 'elastic',
    type: 'technology',
    data: { label: 'Elastic Search', icon: techLogos.elastic, type: 'devops' },
    position: { x: 600, y: 820 }
  },
  {
    id: 'logstash',
    type: 'technology',
    data: { label: 'Logstash', icon: techLogos.logstash, type: 'devops' },
    position: { x: 700, y: 820 }
  },
  {
    id: 'kibana',
    type: 'technology',
    data: { label: 'Kibana', icon: techLogos.kibana, type: 'devops' },
    position: { x: 800, y: 820 }
  }
];

// Define the initial edges
const initialEdges = [
  // Frontend connections
  { id: 'frontend-to-api', source: 'frontend', target: 'frontend-api', animated: true },
  { id: 'frontend-to-mobile', source: 'frontend', target: 'frontend-mobile', animated: true },
  { id: 'frontend-to-web', source: 'frontend', target: 'frontend-web', animated: true },
  { id: 'api-to-graphql', source: 'frontend-api', target: 'graphql' },
  { id: 'mobile-to-swift', source: 'frontend-mobile', target: 'swift' },
  { id: 'mobile-to-reactnative', source: 'frontend-mobile', target: 'reactnative' },
  { id: 'mobile-to-kotlin', source: 'frontend-mobile', target: 'kotlin' },
  { id: 'web-to-redux', source: 'frontend-web', target: 'redux' },
  { id: 'web-to-react', source: 'frontend-web', target: 'react' },
  
  // Backend connections
  { id: 'backend-to-services', source: 'backend', target: 'backend-services', animated: true },
  { id: 'backend-to-databases', source: 'backend', target: 'backend-databases', animated: true },
  { id: 'backend-to-messaging', source: 'backend', target: 'backend-messaging', animated: true },
  { id: 'services-to-django', source: 'backend-services', target: 'django' },
  { id: 'services-to-gunicorn', source: 'backend-services', target: 'gunicorn' },
  { id: 'databases-to-postgres', source: 'backend-databases', target: 'postgres' },
  { id: 'databases-to-cassandra', source: 'backend-databases', target: 'cassandra' },
  { id: 'databases-to-memcached', source: 'backend-databases', target: 'memcached' },
  { id: 'messaging-to-rabbitmq', source: 'backend-messaging', target: 'rabbitmq' },
  { id: 'messaging-to-kafka', source: 'backend-messaging', target: 'kafka' },
  
  // Big Data connections
  { id: 'data-to-storage', source: 'data', target: 'data-storage', animated: true },
  { id: 'data-to-processing', source: 'data', target: 'data-processing', animated: true },
  { id: 'storage-to-haystack', source: 'data-storage', target: 'haystack' },
  { id: 'storage-to-blob', source: 'data-storage', target: 'blob' },
  { id: 'processing-to-spark', source: 'data-processing', target: 'spark' },
  { id: 'processing-to-flink', source: 'data-processing', target: 'flink' },
  { id: 'processing-to-scuba', source: 'data-processing', target: 'scuba' },
  { id: 'processing-to-presto', source: 'data-processing', target: 'presto' },
  
  // ML connections
  { id: 'ml-to-frameworks', source: 'ml', target: 'ml-frameworks', animated: true },
  { id: 'ml-to-tools', source: 'ml', target: 'ml-tools', animated: true },
  { id: 'frameworks-to-automl', source: 'ml-frameworks', target: 'automl' },
  { id: 'frameworks-to-tensorflow', source: 'ml-frameworks', target: 'tensorflow' },
  { id: 'tools-to-pytorch', source: 'ml-tools', target: 'pytorch' },
  { id: 'tools-to-torchserve', source: 'ml-tools', target: 'torchserve' },
  { id: 'tools-to-llama', source: 'ml-tools', target: 'llama' },
  { id: 'tools-to-faiss', source: 'ml-tools', target: 'faiss' },
  
  // DevOps connections
  { id: 'devops-to-tools', source: 'devops', target: 'devops-tools', animated: true },
  { id: 'devops-to-monitoring', source: 'devops', target: 'devops-monitoring', animated: true },
  { id: 'devops-to-logging', source: 'devops', target: 'devops-logging', animated: true },
  { id: 'tools-to-kubernetes', source: 'devops-tools', target: 'kubernetes' },
  { id: 'tools-to-docker', source: 'devops-tools', target: 'docker' },
  { id: 'tools-to-jenkins', source: 'devops-tools', target: 'jenkins' },
  { id: 'monitoring-to-prometheus', source: 'devops-monitoring', target: 'prometheus' },
  { id: 'monitoring-to-grafana', source: 'devops-monitoring', target: 'grafana' },
  { id: 'logging-to-elastic', source: 'devops-logging', target: 'elastic' },
  { id: 'logging-to-logstash', source: 'devops-logging', target: 'logstash' },
  { id: 'logging-to-kibana', source: 'devops-logging', target: 'kibana' }
];

const nodeTypes = {
  technology: TechnologyNode,
  category: CategoryNode,
  subcategory: SubCategoryNode
};

const TechStackFlow = ({ companyName = "The Technology Landscape" }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-[800px] bg-background/80">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="#f8f8f8" size={1.5} />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.data?.type) {
              case 'frontend':
                return '#1a5276';
              case 'backend':
                return '#186a3b';
              case 'data':
                return '#7d3c98';
              case 'ml':
                return '#922b21';
              case 'devops':
                return '#ca2c92';
              default:
                return '#ccc';
            }
          }}
          maskColor="rgba(255, 255, 255, 0.6)"
        />
      </ReactFlow>
    </div>
  );
};

export default TechStackFlow;

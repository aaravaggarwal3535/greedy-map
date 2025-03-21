import React, { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { FiSearch, FiX, FiChevronDown, FiLink, FiCheck, FiVideo, FiBook, FiList } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils"

const Learning = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [activeResourceTab, setActiveResourceTab] = useState("documentation");
  const [activeLevelTab, setActiveLevelTab] = useState("beginner");
  const [progress, setProgress] = useState({});
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('learningProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('learningProgress', JSON.stringify(progress));
  }, [progress]);
  
  // Category images mapping
  const categoryImages = {
    "Frontend Development":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    "Backend Development":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "Programming Languages":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "Artificial Intelligence":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    "Machine Learning":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    Blockchain:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ethereum/ethereum-original.svg",
    "Mobile Development":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "DevOps & Cloud":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    Databases:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "Game Development":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
    "Internet of Things (IoT)":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
    "Big Data & Analytics":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
    "Data Engineering":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    "Monitoring & Observability":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
    "Company Specific Tools":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    "Design Systems":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  };

  // Calculate progress percentage for a category
  const calculateCategoryProgress = (categoryName) => {
    const category = courseCategories.find(cat => cat.name === categoryName);
    if (!category) return 0;
    
    let totalItems = 0;
    let completedItems = 0;
    
    category.courses.forEach(course => {
      totalItems += 4; // Doc + 3 video levels
      if (progress[`${course.title}-doc`]) completedItems++;
      if (progress[`${course.title}-beginner`]) completedItems++;
      if (progress[`${course.title}-intermediate`]) completedItems++;
      if (progress[`${course.title}-advanced`]) completedItems++;
    });
    
    return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  };

  // Toggle completion status
  const toggleCompletion = (courseTitle, resourceType) => {
    const key = `${courseTitle}-${resourceType}`;
    setProgress(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const courseCategories = [
    {
      name: "Programming Languages",
      courses: [
        {
          title: "JavaScript",
          documentation:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
          videos: {
            beginner: "https://www.youtube.com/watch?v=jS4aFq5-91M",
            intermediate: "https://www.youtube.com/watch?v=W6NZfCO5SIk", 
            advanced: "https://www.youtube.com/watch?v=R9I85RhI7Cg"
          }
        },
        { 
          title: "Python", 
          documentation: "https://docs.python.org/3/",
          videos: {
            beginner: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
            intermediate: "https://www.youtube.com/watch?v=rfscVS0vtbw", 
            advanced: "https://www.youtube.com/watch?v=HGOBQPFzWKo"
          }
        },
        { title: "Java", documentation: "https://docs.oracle.com/en/java/" },
        { title: "C++", documentation: "https://en.cppreference.com/w/" },
        {
          title: "TypeScript",
          documentation: "https://www.typescriptlang.org/docs/",
        },
        { title: "Go", documentation: "https://go.dev/doc/" },
        { title: "Rust", documentation: "https://doc.rust-lang.org/book/" },
        { title: "Ruby", documentation: "https://ruby-doc.org/" },
        { title: "PHP", documentation: "https://www.php.net/docs.php" },
        {
          title: "C#",
          documentation: "https://learn.microsoft.com/en-us/dotnet/csharp/",
        },
        { title: "Swift", documentation: "https://docs.swift.org/swift-book/" },
        { title: "Kotlin", documentation: "https://kotlinlang.org/docs/" },
        { title: "Scala", documentation: "https://docs.scala-lang.org/" },
        {
          title: "Haskell",
          documentation: "https://www.haskell.org/documentation/",
        },
        {
          title: "Clojure",
          documentation: "https://clojure.org/guides/getting_started",
        },
        { title: "Elixir", documentation: "https://elixir-lang.org/docs.html" },
        { title: "C", documentation: "https://en.cppreference.com/w/c" },
        { title: "Dart", documentation: "https://dart.dev/guides" },
        { title: "Hack", documentation: "https://docs.hhvm.com/hack/" },
      ],
    },
    {
      name: "Frontend Development",
      courses: [
        {
          title: "React",
          documentation: "https://reactjs.org/docs/getting-started.html",
        },
        {
          title: "Vue.js",
          documentation: "https://vuejs.org/guide/introduction.html",
        },
        { title: "Angular", documentation: "https://angular.io/docs" },
        {
          title: "HTML & CSS",
          documentation: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        },
        {
          title: "JavaScript",
          documentation:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        {
          title: "TypeScript",
          documentation: "https://www.typescriptlang.org/docs/",
        },
        { title: "Next.js", documentation: "https://nextjs.org/docs" },
        { title: "Nuxt.js", documentation: "https://nuxtjs.org/docs" },
        { title: "Svelte", documentation: "https://svelte.dev/docs" },
        {
          title: "Tailwind CSS",
          documentation: "https://tailwindcss.com/docs",
        },
        { title: "Bootstrap", documentation: "https://getbootstrap.com/docs/" },
        {
          title: "Material UI",
          documentation: "https://mui.com/material-ui/getting-started/",
        },
        {
          title: "Chakra UI",
          documentation: "https://chakra-ui.com/docs/getting-started",
        },
        {
          title: "Styled Components",
          documentation: "https://styled-components.com/docs",
        },
        {
          title: "Redux",
          documentation: "https://redux.js.org/introduction/getting-started",
        },
        {
          title: "Zustand",
          documentation: "https://github.com/pmndrs/zustand",
        },
        { title: "Gatsby", documentation: "https://www.gatsbyjs.com/docs/" },
        { title: "Vite", documentation: "https://vitejs.dev/guide/" },
        { title: "Webpack", documentation: "https://webpack.js.org/concepts/" },
        { title: "Parcel", documentation: "https://parceljs.org/docs/" },
        {
          title: "React Native",
          documentation: "https://reactnative.dev/docs/getting-started",
        },
        {
          title: "CSS Modules",
          documentation: "https://github.com/css-modules/css-modules",
        },
        { title: "RxJS", documentation: "https://rxjs.dev/guide/overview" },
        {
          title: "Web Components",
          documentation:
            "https://developer.mozilla.org/en-US/docs/Web/Web_Components",
        },
        { title: "Flow", documentation: "https://flow.org/en/docs/" },
        {
          title: "Flexbox",
          documentation:
            "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox",
        },
        {
          title: "Electron",
          documentation: "https://www.electronjs.org/docs/latest/",
        },
        {
          title: "BaseUI",
          documentation: "https://baseweb.design/getting-started/",
        },
        {
          title: "Hypernova",
          documentation: "https://github.com/airbnb/hypernova",
        },
        { title: "Scala.js", documentation: "https://www.scala-js.org/doc/" },
      ],
    },
    {
      name: "Backend Development",
      courses: [
        { title: "Node.js", documentation: "https://nodejs.org/en/docs/" },
        {
          title: "Express.js",
          documentation: "https://expressjs.com/en/guide/routing.html",
        },
        {
          title: "Django",
          documentation: "https://docs.djangoproject.com/en/stable/",
        },
        {
          title: "Flask",
          documentation: "https://flask.palletsprojects.com/en/2.2.x/",
        },
        {
          title: "Spring Boot",
          documentation: "https://spring.io/projects/spring-boot",
        },
        {
          title: "Ruby on Rails",
          documentation: "https://guides.rubyonrails.org/",
        },
        {
          title: "ASP.NET Core",
          documentation:
            "https://learn.microsoft.com/en-us/aspnet/core/?view=aspnetcore-7.0",
        },
        { title: "Laravel", documentation: "https://laravel.com/docs" },
        { title: "FastAPI", documentation: "https://fastapi.tiangolo.com/" },
        { title: "Nest.js", documentation: "https://docs.nestjs.com/" },
        { title: "GraphQL", documentation: "https://graphql.org/learn/" },
        {
          title: "Apollo Server",
          documentation: "https://www.apollographql.com/docs/apollo-server/",
        },
        { title: "Strapi", documentation: "https://docs.strapi.io/" },
        { title: "Koa", documentation: "https://koajs.com/" },
        { title: "Hapi", documentation: "https://hapi.dev/tutorials/" },
        {
          title: "Phoenix",
          documentation: "https://hexdocs.pm/phoenix/overview.html",
        },
        { title: "Echo", documentation: "https://echo.labstack.com/guide" },
        { title: "Gin", documentation: "https://gin-gonic.com/docs/" },
        { title: "Fiber", documentation: "https://docs.gofiber.io/" },
        {
          title: "Spring",
          documentation: "https://spring.io/projects/spring-framework",
        },
        { title: "Scala", documentation: "https://docs.scala-lang.org/" },
        { title: "Hack", documentation: "https://docs.hhvm.com/hack/" },
        { title: "Vitess", documentation: "https://vitess.io/docs/" },
        { title: "Thrift", documentation: "https://thrift.apache.org/docs/" },
        { title: "gRPC", documentation: "https://grpc.io/docs/" },
        {
          title: "Finagle",
          documentation: "https://twitter.github.io/finagle/guide/",
        },
        { title: "Java", documentation: "https://docs.oracle.com/en/java/" },
        {
          title: "Schemaless",
          documentation: "https://eng.uber.com/schemaless-part-one/",
        },
      ],
    },
    {
      name: "Artificial Intelligence",
      courses: [
        {
          title: "TensorFlow",
          documentation: "https://www.tensorflow.org/api_docs",
        },
        {
          title: "PyTorch",
          documentation: "https://pytorch.org/docs/stable/index.html",
        },
        {
          title: "scikit-learn",
          documentation: "https://scikit-learn.org/stable/documentation.html",
        },
        { title: "Hugging Face", documentation: "https://huggingface.co/docs" },
        { title: "OpenAI", documentation: "https://platform.openai.com/docs/" },
        { title: "NLTK", documentation: "https://www.nltk.org/" },
        { title: "spaCy", documentation: "https://spacy.io/api/doc" },
        {
          title: "Transformers",
          documentation: "https://huggingface.co/docs/transformers/index",
        },
        {
          title: "JAX",
          documentation: "https://jax.readthedocs.io/en/latest/",
        },
        {
          title: "Langchain",
          documentation: "https://docs.langchain.com/docs/",
        },
        {
          title: "ONNX",
          documentation: "https://onnx.ai/onnx/intro/index.html",
        },
        { title: "OpenCV", documentation: "https://docs.opencv.org/4.x/" },
        { title: "DVC", documentation: "https://dvc.org/doc" },
        { title: "Ray", documentation: "https://docs.ray.io/en/latest/" },
        { title: "FastAI", documentation: "https://docs.fast.ai/" },
        {
          title: "Luigi",
          documentation: "https://luigi.readthedocs.io/en/stable/",
        },
        { title: "Annoy", documentation: "https://github.com/spotify/annoy" },
        {
          title: "Horovod",
          documentation: "https://github.com/horovod/horovod",
        },
        { title: "Radar", documentation: "https://stripe.com/docs/radar" },
        { title: "H3", documentation: "https://h3geo.org/docs/" },
        {
          title: "Heron",
          documentation:
            "https://apache.github.io/incubator-heron/docs/getting-started/",
        },
        {
          title: "Jupyter",
          documentation: "https://jupyter.org/documentation",
        },
        {
          title: "Michelangelo",
          documentation:
            "https://eng.uber.com/michelangelo-machine-learning-platform/",
        },
      ],
    },
    {
      name: "Machine Learning",
      courses: [
        { title: "Pandas", documentation: "https://pandas.pydata.org/docs/" },
        { title: "NumPy", documentation: "https://numpy.org/doc/stable/" },
        {
          title: "Matplotlib",
          documentation: "https://matplotlib.org/stable/contents.html",
        },
        { title: "Keras", documentation: "https://keras.io/api/" },
        { title: "SciPy", documentation: "https://docs.scipy.org/doc/scipy/" },
        { title: "Seaborn", documentation: "https://seaborn.pydata.org/" },
        {
          title: "XGBoost",
          documentation: "https://xgboost.readthedocs.io/en/stable/",
        },
        {
          title: "LightGBM",
          documentation: "https://lightgbm.readthedocs.io/en/latest/",
        },
        { title: "CatBoost", documentation: "https://catboost.ai/en/docs/" },
        { title: "Plotly", documentation: "https://plotly.com/python/" },
        { title: "Bokeh", documentation: "https://docs.bokeh.org/en/latest/" },
        { title: "Streamlit", documentation: "https://docs.streamlit.io/" },
        { title: "Gradio", documentation: "https://www.gradio.app/docs/" },
        {
          title: "MLflow",
          documentation: "https://mlflow.org/docs/latest/index.html",
        },
        {
          title: "Prophet",
          documentation:
            "https://facebook.github.io/prophet/docs/quick_start.html",
        },
        {
          title: "Scikit-image",
          documentation: "https://scikit-image.org/docs/stable/",
        },
        {
          title: "Statsmodels",
          documentation: "https://www.statsmodels.org/stable/index.html",
        },
        { title: "PyCaret", documentation: "https://pycaret.gitbook.io/docs/" },
        {
          title: "Optuna",
          documentation: "https://optuna.readthedocs.io/en/stable/",
        },
        {
          title: "SHAP",
          documentation: "https://shap.readthedocs.io/en/latest/",
        },
        {
          title: "Yellowbrick",
          documentation: "https://www.scikit-yb.org/en/latest/",
        },
        { title: "H2O", documentation: "https://docs.h2o.ai/" },
        {
          title: "Hyperopt",
          documentation: "https://hyperopt.github.io/hyperopt/",
        },
        {
          title: "Featuretools",
          documentation: "https://featuretools.alteryx.com/en/stable/",
        },
        {
          title: "TPOT",
          documentation: "https://epistasislab.github.io/tpot/",
        },
        { title: "AutoKeras", documentation: "https://autokeras.com/" },
        {
          title: "Great Expectations",
          documentation: "https://docs.greatexpectations.io/docs/",
        },
        {
          title: "Polars",
          documentation: "https://pola-rs.github.io/polars/py-polars/html/",
        },
        { title: "Dask", documentation: "https://docs.dask.org/en/stable/" },
        { title: "Vaex", documentation: "https://vaex.io/docs/index.html" },
        {
          title: "Modin",
          documentation: "https://modin.readthedocs.io/en/stable/",
        },
        { title: "PyMC", documentation: "https://docs.pymc.io/" },
        { title: "GPyTorch", documentation: "https://gpytorch.ai/" },
        { title: "Kornia", documentation: "https://kornia.readthedocs.io/" },
        { title: "Sktime", documentation: "https://www.sktime.org/en/stable/" },
      ],
    },
    {
      name: "Big Data & Analytics",
      courses: [
        {
          title: "Apache Spark",
          documentation: "https://spark.apache.org/docs/latest/",
        },
        { title: "Hadoop", documentation: "https://hadoop.apache.org/docs/" },
        {
          title: "Apache Kafka",
          documentation: "https://kafka.apache.org/documentation/",
        },
        {
          title: "Apache Flink",
          documentation: "https://flink.apache.org/docs/stable/",
        },
        {
          title: "Apache Beam",
          documentation: "https://beam.apache.org/documentation/",
        },
        { title: "Databricks", documentation: "https://docs.databricks.com/" },
        {
          title: "Apache Hive",
          documentation:
            "https://cwiki.apache.org/confluence/display/Hive/Home",
        },
        {
          title: "Apache HBase",
          documentation: "https://hbase.apache.org/book.html",
        },
        {
          title: "Apache Airflow",
          documentation: "https://airflow.apache.org/docs/",
        },
        {
          title: "Elasticsearch",
          documentation:
            "https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html",
        },
        {
          title: "Kibana",
          documentation:
            "https://www.elastic.co/guide/en/kibana/current/index.html",
        },
        {
          title: "Logstash",
          documentation:
            "https://www.elastic.co/guide/en/logstash/current/index.html",
        },
        { title: "Snowflake", documentation: "https://docs.snowflake.com/" },
        {
          title: "Delta Lake",
          documentation: "https://docs.delta.io/latest/index.html",
        },
        {
          title: "Apache Druid",
          documentation: "https://druid.apache.org/docs/latest/design/",
        },
        {
          title: "PySpark",
          documentation:
            "https://spark.apache.org/docs/latest/api/python/index.html",
        },
        { title: "Presto", documentation: "https://prestodb.io/docs/current/" },
        {
          title: "Apache ZooKeeper",
          documentation: "https://zookeeper.apache.org/doc/current/",
        },
        { title: "Cloudera", documentation: "https://docs.cloudera.com/" },
        {
          title: "Impala",
          documentation: "https://impala.apache.org/docs.html",
        },
        { title: "ClickHouse", documentation: "https://clickhouse.com/docs/" },
      ],
    },
    {
      name: "Blockchain",
      courses: [
        {
          title: "Ethereum",
          documentation: "https://ethereum.org/en/developers/docs/",
        },
        { title: "Solidity", documentation: "https://docs.soliditylang.org/" },
        { title: "Web3.js", documentation: "https://web3js.readthedocs.io/" },
        {
          title: "Hardhat",
          documentation:
            "https://hardhat.org/hardhat-runner/docs/getting-started",
        },
        { title: "Solana", documentation: "https://docs.solana.com/" },
        { title: "Truffle", documentation: "https://trufflesuite.com/docs/" },
        { title: "Ethers.js", documentation: "https://docs.ethers.org/v5/" },
        { title: "Foundry", documentation: "https://book.getfoundry.sh/" },
        {
          title: "OpenZeppelin",
          documentation: "https://docs.openzeppelin.com/",
        },
        { title: "Chainlink", documentation: "https://docs.chain.link/" },
        { title: "Polygon", documentation: "https://wiki.polygon.technology/" },
        {
          title: "Rust (for Solana)",
          documentation:
            "https://docs.solana.com/developing/on-chain-programs/developing-rust",
        },
        { title: "Anchor", documentation: "https://www.anchor-lang.com/" },
        { title: "NEAR Protocol", documentation: "https://docs.near.org/" },
        {
          title: "Polkadot",
          documentation: "https://wiki.polkadot.network/docs/getting-started",
        },
      ],
    },
    {
      name: "Mobile Development",
      courses: [
        {
          title: "React Native",
          documentation: "https://reactnative.dev/docs/getting-started",
        },
        { title: "Flutter", documentation: "https://docs.flutter.dev/" },
        { title: "Swift", documentation: "https://docs.swift.org/swift-book/" },
        { title: "Kotlin", documentation: "https://kotlinlang.org/docs/" },
        {
          title: "Jetpack Compose",
          documentation:
            "https://developer.android.com/jetpack/compose/documentation",
        },
        {
          title: "SwiftUI",
          documentation: "https://developer.apple.com/documentation/swiftui/",
        },
        { title: "Ionic", documentation: "https://ionicframework.com/docs" },
        { title: "Capacitor", documentation: "https://capacitorjs.com/docs" },
        { title: "Expo", documentation: "https://docs.expo.dev/" },
        {
          title: "NativeScript",
          documentation: "https://docs.nativescript.org/",
        },
      ],
    },
    {
      name: "DevOps & Cloud",
      courses: [
        { title: "Docker", documentation: "https://docs.docker.com/" },
        {
          title: "Kubernetes",
          documentation: "https://kubernetes.io/docs/home/",
        },
        { title: "AWS", documentation: "https://docs.aws.amazon.com/" },
        {
          title: "Azure",
          documentation:
            "https://learn.microsoft.com/en-us/azure/?product=popular",
        },
        {
          title: "Google Cloud (GCP)",
          documentation: "https://cloud.google.com/docs",
        },
        {
          title: "Terraform",
          documentation: "https://developer.hashicorp.com/terraform/docs",
        },
        { title: "Ansible", documentation: "https://docs.ansible.com/" },
        {
          title: "GitHub Actions",
          documentation: "https://docs.github.com/en/actions",
        },
        { title: "Jenkins", documentation: "https://www.jenkins.io/doc/" },
        { title: "CircleCI", documentation: "https://circleci.com/docs/" },
        {
          title: "ArgoCD",
          documentation: "https://argo-cd.readthedocs.io/en/stable/",
        },
        {
          title: "Prometheus",
          documentation: "https://prometheus.io/docs/introduction/overview/",
        },
        { title: "Grafana", documentation: "https://grafana.com/docs/" },
        { title: "Helm", documentation: "https://helm.sh/docs/" },
        { title: "Pulumi", documentation: "https://www.pulumi.com/docs/" },
        { title: "Spinnaker", documentation: "https://spinnaker.io/docs/" },
        {
          title: "Chaos Monkey",
          documentation: "https://github.com/Netflix/chaosmonkey",
        },
        {
          title: "Mesos",
          documentation: "http://mesos.apache.org/documentation/latest/",
        },
        {
          title: "Aurora",
          documentation: "https://aurora.apache.org/documentation/",
        },
        {
          title: "ZooKeeper",
          documentation: "https://zookeeper.apache.org/doc/current/",
        },
        {
          title: "Consul",
          documentation: "https://developer.hashicorp.com/consul/docs",
        },
        {
          title: "Jaeger",
          documentation: "https://www.jaegertracing.io/docs/latest/",
        },
        {
          title: "Piper",
          documentation:
            "https://cloud.google.com/solutions/devops/devops-tech-continuous-integration",
        },
        {
          title: "Vault",
          documentation: "https://developer.hashicorp.com/vault/docs",
        },
        { title: "Bazel", documentation: "https://bazel.build/docs" },
        {
          title: "ELK Stack",
          documentation: "https://www.elastic.co/guide/index.html",
        },
        { title: "Chef", documentation: "https://docs.chef.io/" },
        { title: "DataDog", documentation: "https://docs.datadoghq.com/" },
        { title: "New Relic", documentation: "https://docs.newrelic.com/" },
        { title: "Splunk", documentation: "https://docs.splunk.com/" },
        {
          title: "PagerDuty",
          documentation: "https://developer.pagerduty.com/docs/",
        },
      ],
    },
    {
      name: "Databases",
      courses: [
        { title: "MongoDB", documentation: "https://docs.mongodb.com/" },
        {
          title: "PostgreSQL",
          documentation: "https://www.postgresql.org/docs/",
        },
        { title: "MySQL", documentation: "https://dev.mysql.com/doc/" },
        { title: "Redis", documentation: "https://redis.io/documentation" },
        {
          title: "Elasticsearch",
          documentation: "https://www.elastic.co/guide/index.html",
        },
        {
          title: "Cassandra",
          documentation: "https://cassandra.apache.org/doc/latest/",
        },
        {
          title: "DynamoDB",
          documentation: "https://docs.aws.amazon.com/dynamodb/",
        },
        {
          title: "Firestore",
          documentation: "https://firebase.google.com/docs/firestore",
        },
        { title: "Prisma", documentation: "https://www.prisma.io/docs/" },
        { title: "Sequelize", documentation: "https://sequelize.org/docs/" },
        { title: "SQLAlchemy", documentation: "https://docs.sqlalchemy.org/" },
        { title: "TypeORM", documentation: "https://typeorm.io/" },
        { title: "Neo4j", documentation: "https://neo4j.com/docs/" },
        { title: "ClickHouse", documentation: "https://clickhouse.com/docs/" },
        { title: "Supabase", documentation: "https://supabase.com/docs" },
        {
          title: "EVCache",
          documentation: "https://github.com/Netflix/EVCache",
        },
        {
          title: "Hystrix",
          documentation: "https://github.com/Netflix/Hystrix/wiki",
        },
        {
          title: "Manhattan",
          documentation:
            "https://blog.twitter.com/engineering/en_us/a/2014/manhattan-our-real-time-multi-tenant-distributed-database-for-twitter-scale",
        },
        {
          title: "Schemaless",
          documentation: "https://eng.uber.com/schemaless-part-one/",
        },
        { title: "M3DB", documentation: "https://m3db.io/docs/" },
        {
          title: "Bigtable",
          documentation: "https://cloud.google.com/bigtable/docs",
        },
        { title: "Memcached", documentation: "https://memcached.org/about" },
        { title: "RocksDB", documentation: "https://rocksdb.org/docs/" },
        { title: "Vitess", documentation: "https://vitess.io/docs/" },
        {
          title: "Kafka",
          documentation: "https://kafka.apache.org/documentation/",
        },
      ],
    },
    {
      name: "Game Development",
      courses: [
        { title: "Unity", documentation: "https://docs.unity3d.com/Manual/" },
        {
          title: "Unreal Engine",
          documentation: "https://docs.unrealengine.com/en-US/",
        },
        {
          title: "Godot",
          documentation: "https://docs.godotengine.org/en/stable/",
        },
        {
          title: "Phaser",
          documentation: "https://newdocs.phaser.io/docs/3.55.2",
        },
        { title: "Three.js", documentation: "https://threejs.org/docs/" },
        {
          title: "PlayCanvas",
          documentation: "https://developer.playcanvas.com/en/user-manual/",
        },
        { title: "Babylon.js", documentation: "https://doc.babylonjs.com/" },
        {
          title: "Cocos Creator",
          documentation: "https://docs.cocos.com/creator/manual/en/",
        },
        { title: "A-Frame", documentation: "https://aframe.io/docs/" },
        {
          title: "PixiJS",
          documentation: "https://pixijs.download/dev/docs/index.html",
        },
        {
          title: "WebGL",
          documentation:
            "https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API",
        },
        {
          title: "Amazon Lumberyard",
          documentation: "https://docs.aws.amazon.com/lumberyard/",
        },
        {
          title: "Cocos2d",
          documentation: "https://docs.cocos.com/cocos2d-x/manual/en/",
        },
        {
          title: "GameMaker Studio",
          documentation: "https://docs.yoyogames.com/",
        },
        {
          title: "RPG Maker",
          documentation: "https://www.rpgmakerweb.com/support",
        },
        {
          title: "Construct",
          documentation: "https://www.construct.net/en/make-games/manuals",
        },
      ],
    },
    {
      name: "Internet of Things (IoT)",
      courses: [
        { title: "Arduino", documentation: "https://docs.arduino.cc/" },
        {
          title: "Raspberry Pi",
          documentation: "https://www.raspberrypi.com/documentation/",
        },
        {
          title: "MQTT",
          documentation: "https://mqtt.org/mqtt-specification/",
        },
        { title: "Node-RED", documentation: "https://nodered.org/docs/" },
        {
          title: "ESP32",
          documentation:
            "https://docs.espressif.com/projects/esp-idf/en/latest/",
        },
        {
          title: "Mongoose OS",
          documentation: "https://mongoose-os.com/docs/",
        },
        { title: "Particle", documentation: "https://docs.particle.io/" },
        {
          title: "Micropython",
          documentation: "https://docs.micropython.org/",
        },
        { title: "Zephyr", documentation: "https://docs.zephyrproject.org/" },
        {
          title: "AWS IoT Core",
          documentation: "https://docs.aws.amazon.com/iot/",
        },
      ],
    },
    {
      name: "Company Specific Tools",
      courses: [
        {
          title: "Michelangelo",
          documentation:
            "https://eng.uber.com/michelangelo-machine-learning-platform/",
          company: "Uber",
        },
        {
          title: "BigHead",
          documentation:
            "https://medium.com/airbnb-engineering/bighead-airbnbs-end-to-end-machine-learning-platform-ad20a7540354",
          company: "Airbnb",
        },
        {
          title: "Aerosolve",
          documentation: "https://github.com/airbnb/aerosolve",
          company: "Airbnb",
        },
        {
          title: "Hypernova",
          documentation: "https://github.com/airbnb/hypernova",
          company: "Airbnb",
        },
        {
          title: "DLS (Design Language System)",
          documentation: "https://airbnb.design/building-a-visual-language/",
          company: "Airbnb",
        },
        {
          title: "Chaos Monkey",
          documentation: "https://github.com/Netflix/chaosmonkey",
          company: "Netflix",
        },
        {
          title: "Spinnaker",
          documentation: "https://spinnaker.io/docs/",
          company: "Netflix",
        },
        {
          title: "EVCache",
          documentation: "https://github.com/Netflix/EVCache",
          company: "Netflix",
        },
        {
          title: "Hystrix",
          documentation: "https://github.com/Netflix/Hystrix/wiki",
          company: "Netflix",
        },
        {
          title: "DeepBird",
          documentation:
            "https://blog.twitter.com/engineering/en_us/topics/insights/2019/improving-engagement-on-digital-ads-with-delayed-feedback",
          company: "Twitter",
        },
        {
          title: "Manhattan",
          documentation:
            "https://blog.twitter.com/engineering/en_us/a/2014/manhattan-our-real-time-multi-tenant-distributed-database-for-twitter-scale",
          company: "Twitter",
        },
        {
          title: "Piper",
          documentation:
            "https://cloud.google.com/solutions/devops/devops-tech-continuous-integration",
          company: "Google",
        },
        {
          title: "Schemaless",
          documentation: "https://eng.uber.com/schemaless-part-one/",
          company: "Uber",
        },
        {
          title: "M3DB",
          documentation: "https://m3db.io/docs/",
          company: "Uber",
        },
        {
          title: "H3",
          documentation: "https://h3geo.org/docs/",
          company: "Uber",
        },
        {
          title: "Radar",
          documentation: "https://stripe.com/docs/radar",
          company: "Stripe",
        },
      ],
    },
    {
      name: "Design Systems",
      courses: [
        {
          title: "Material Design",
          documentation: "https://material.io/design",
        },
        {
          title: "DLS (Airbnb)",
          documentation: "https://airbnb.design/building-a-visual-language/",
        },
        {
          title: "Fluent Design",
          documentation: "https://developer.microsoft.com/en-us/fluentui#/",
        },
        {
          title: "Apple Human Interface",
          documentation:
            "https://developer.apple.com/design/human-interface-guidelines/",
        },
        {
          title: "Atlassian Design System",
          documentation: "https://atlassian.design/",
        },
        {
          title: "IBM Carbon",
          documentation: "https://www.carbondesignsystem.com/",
        },
        {
          title: "Shopify Polaris",
          documentation: "https://polaris.shopify.com/",
        },
        {
          title: "Salesforce Lightning",
          documentation: "https://www.lightningdesignsystem.com/",
        },
        {
          title: "BaseUI",
          documentation: "https://baseweb.design/getting-started/",
        },
        { title: "Chakra UI", documentation: "https://chakra-ui.com/docs/" },
      ],
    },
  ];

  useEffect(() => {
    // Initialize filtered categories on component mount
    setFilteredCategories(courseCategories);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCategories(courseCategories);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();

    const filtered = courseCategories
      .map((category) => {
        const filteredCourses = category.courses.filter((course) =>
          course.title.toLowerCase().includes(lowercasedSearch)
        );

        return {
          ...category,
          courses: filteredCourses,
        };
      })
      .filter((category) => category.courses.length > 0);

    setFilteredCategories(filtered);

    // Auto-expand a single category when searching
    if (filtered.length === 1 && searchTerm.length > 2) {
      setExpandedCategory(filtered[0].name);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Parse URL for search param
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }

    // Handle hash for category linking
    const hash = location.hash.replace("#", "");
    if (hash) {
      const decodedHash = decodeURIComponent(hash);
      const foundCategory = courseCategories.find(
        (category) => category.name === decodedHash
      );
      if (foundCategory) {
        setExpandedCategory(foundCategory.name);
        // Scroll to category after a short delay to ensure render
        setTimeout(() => {
          const element = document.getElementById(decodedHash);
          if (element) {
            // This will use our global smooth scrolling
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 200); // Reduced timeout for better responsiveness
      }
    }
  }, [location]);

  // Function to clear search
  const clearSearch = () => {
    setSearchTerm("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Function to toggle category expansion
  const toggleCategory = (categoryName) => {
    setExpandedCategory(
      expandedCategory === categoryName ? null : categoryName
    );
  };

  // Function to filter within a specific category
  const filterWithinCategory = (categoryName) => {
    setExpandedCategory(categoryName);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Learning Resources
        </h1>

        {/* Main Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-4 pl-12 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition bg-white"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />

            {/* Clear button */}
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Clear search"
              >
                <FiX className="text-xl" />
              </button>
            )}
          </div>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
              <FiSearch className="text-4xl text-gray-400" />
            </div>
            <p className="text-xl text-gray-600">
              No technologies found matching "{searchTerm}"
            </p>
            <button
              onClick={clearSearch}
              className="mt-4 text-blue-500 hover:text-blue-700 font-medium"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredCategories.map((category, index) => (
              <motion.div
                id={encodeURIComponent(category.name)}
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${expandedCategory === category.name ? "col-span-full" : ""
                  }`}
              >
                <div
                  onClick={() => toggleCategory(category.name)}
                  className={`cursor-pointer ${expandedCategory !== category.name
                      ? "bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100"
                      : "bg-white"
                    } transition-all duration-300`}
                >
                  <div className="flex items-center p-6">
                    <div className="flex-shrink-0 w-16 h-16 mr-5 bg-blue-50 rounded-lg flex items-center justify-center">
                      {/* Replace SiBlockchain with a more universal approach */}
                      {category.name === "Blockchain" ? (
                        <div className="text-3xl text-blue-600 font-bold">
                          B
                        </div>
                      ) : (
                        <img
                          src={categoryImages[category.name]}
                          alt={category.name}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            e.target.parentNode.innerHTML = `<div class="text-3xl text-blue-600 font-bold">${category.name.charAt(
                              0
                            )}</div>`;
                          }}
                        />
                      )}
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {category.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-500 text-sm">
                          {category.courses.length} technologies
                        </p>
                        
                        {/* Progress percentage */}
                        <div className="text-xs font-medium text-blue-600">
                          {calculateCategoryProgress(category.name).toFixed(0)}% complete
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <Progress 
                        value={calculateCategoryProgress(category.name)} 
                        className="h-1 mt-2" 
                      />
                    </div>
                    <motion.div
                      animate={{
                        rotate: expandedCategory === category.name ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-2"
                    >
                      <FiChevronDown className="text-gray-400 text-xl" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedCategory === category.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 bg-white px-6 pt-4 pb-6"
                    >
                      {/* Category-specific search bar */}
                      <div className="mb-6 relative">
                        <input
                          type="text"
                          placeholder={`Search ${category.name.toLowerCase()} technologies...`}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full py-2 px-4 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>

                      {/* Combined resource grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.courses.map((course, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.03 }}
                            className="bg-gradient-to-br from-gray-50 to-white border rounded-lg p-4 hover:shadow-md transition-all hover:border-blue-200"
                          >
                            <h3 className="text-lg font-medium text-gray-800 mb-3">
                              {course.title}
                            </h3>
                            
                            {/* Documentation */}
                            <div className="flex justify-between items-center mb-2 py-1 border-b border-gray-100">
                              <a
                                href={course.documentation}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium hover:underline"
                              >
                                <FiBook className="mr-2" /> Documentation
                              </a>
                              <Checkbox 
                                id={`${course.title}-doc`}
                                checked={progress[`${course.title}-doc`] || false}
                                onCheckedChange={() => toggleCompletion(course.title, 'doc')}
                              />
                            </div>
                            
                            {/* Beginner Video */}
                            {course.videos?.beginner && (
                              <div className="flex justify-between items-center mb-2 py-1 border-b border-gray-100">
                                <a
                                  href={course.videos.beginner}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                >
                                  <FiVideo className="mr-2" /> Beginner Video
                                </a>
                                <Checkbox 
                                  id={`${course.title}-beginner`}
                                  checked={progress[`${course.title}-beginner`] || false}
                                  onCheckedChange={() => toggleCompletion(course.title, 'beginner')}
                                />
                              </div>
                            )}
                            
                            {/* Intermediate Video */}
                            {course.videos?.intermediate && (
                              <div className="flex justify-between items-center mb-2 py-1 border-b border-gray-100">
                                <a
                                  href={course.videos.intermediate}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                >
                                  <FiVideo className="mr-2" /> Intermediate Video
                                </a>
                                <Checkbox 
                                  id={`${course.title}-intermediate`}
                                  checked={progress[`${course.title}-intermediate`] || false}
                                  onCheckedChange={() => toggleCompletion(course.title, 'intermediate')}
                                />
                              </div>
                            )}
                            
                            {/* Advanced Video */}
                            {course.videos?.advanced && (
                              <div className="flex justify-between items-center py-1">
                                <a
                                  href={course.videos.advanced}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                >
                                  <FiVideo className="mr-2" /> Advanced Video
                                </a>
                                <Checkbox 
                                  id={`${course.title}-advanced`}
                                  checked={progress[`${course.title}-advanced`] || false}
                                  onCheckedChange={() => toggleCompletion(course.title, 'advanced')}
                                />
                              </div>
                            )}
                            
                            {/* Progress indicator */}
                            <div className="mt-3 pt-2">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>
                                  {(((progress[`${course.title}-doc`] ? 1 : 0) + 
                                    (progress[`${course.title}-beginner`] ? 1 : 0) + 
                                    (progress[`${course.title}-intermediate`] ? 1 : 0) + 
                                    (progress[`${course.title}-advanced`] ? 1 : 0)) / 
                                    (1 + (course.videos?.beginner ? 1 : 0) + 
                                    (course.videos?.intermediate ? 1 : 0) + 
                                    (course.videos?.advanced ? 1 : 0)) * 100).toFixed(0)}%
                                </span>
                              </div>
                              <Progress 
                                value={(((progress[`${course.title}-doc`] ? 1 : 0) + 
                                  (progress[`${course.title}-beginner`] ? 1 : 0) + 
                                  (progress[`${course.title}-intermediate`] ? 1 : 0) + 
                                  (progress[`${course.title}-advanced`] ? 1 : 0)) / 
                                  (1 + (course.videos?.beginner ? 1 : 0) + 
                                  (course.videos?.intermediate ? 1 : 0) + 
                                  (course.videos?.advanced ? 1 : 0)) * 100)} 
                                className="h-1" 
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-20 mb-6 text-center border-t border-gray-200 pt-16"
      >
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Want to learn any technology?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Confused in how to start learning any technology explore the Roadmaps for better understanding and clarity.
        </p>
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 text-white   rounded-3xl px-8 py-2 h-11 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <Link to="/roadmap">Explore Roadmaps</Link>
        </Button>
      </motion.div>
    </Layout>
  );
};

export default Learning;

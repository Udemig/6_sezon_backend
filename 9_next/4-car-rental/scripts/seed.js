const { register } = require("ts-node");

// Register TypeScript compiler
register({
  transpileOnly: true,
  compilerOptions: {
    module: "commonjs",
    target: "es2020",
    moduleResolution: "node",
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    strict: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    resolveJsonModule: true,
  },
});

// Import and run the seed function
const seedDatabase = require("../src/lib/seed").default;

seedDatabase();

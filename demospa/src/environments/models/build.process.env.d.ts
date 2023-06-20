declare var build: Build;

interface Build {
  process: BuildProcess;
}

interface BuildProcess {
  env: Env;
}

interface Env {
  CX_B2B_SITE: boolean;
}

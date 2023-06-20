export const environment = {
  production: true,
  occ: {
    //   occBaseUrl: '',
    prefix: '/occ/v2/'
  },
  b2bSite: build.process.env.CX_B2B_SITE ?? false
};

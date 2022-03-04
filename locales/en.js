export default {
  ui: {
    username: "Username",
    passphrase: "Passphrase",
    login: "Login",
    tag: "Tag",
    register: "Register",
    or: "OR",
    failed: "Failed",
    yes: "Yes",
    no: "No",
    edit: "Edit",
    clone: "Clone",
    delete: "Delete",
    archive: "Archive",
    restore: "Restore",
    save: "Save",
    cancel: "Cancel",
    all: "All",
  },

  menu: {
    join: "join.oka",
    login: "login.oka",
    demo: "Demo",
    about: "About",
    privacy: "Privacy",
    terms: "Terms_Of_service",
    issues: "Issues",
    status: "Status_Page",
    passphrase: "Passphrase",
    export: "Export",
    import: "Import",
    logout: "Logout",
    preferences: "Preferences",
  },

  hello: {
    h2: "Free, anonymous, E2E encrypted and open sourced credential manager_"
  },

  join: {
    h1: "Join.Oka",
    title: "Join OKA cloud",
    step1: "Generating SRP keys",
    step2: "Generating master key",
    step3: "GENERATING PUBLIC KEY PAIR",
    step4: "Transfer",
  },

  joinForm: {
    step0: "choose your credentials",
    step1: "verify your passphrase",
    step2: "check our terms of service",
    check0: `I understand that OKA is <i>unable</i> to recover a lost passphrase`,
    check1: `I have read and agreed to the <a target="_blank" href="{url}">Terms of Service</a>.`,
  },

  login: {
    h1: "Sign.In",
    title: "Sign in to OKA cloud",
    auth0: "SRP#0",
    auth1: "SRP#1"
  },

  spa: {
    title: "Sign in to OKA backup"
  },

  space: {
    titleTemplate: "%s · workspace",
  },

  spaceLeft: {
    workspaces: "Workspaces",
  },

  export: {
    h2: "Export",
    h3: "Offline copy",
    p1: "Download a read-only portable version of OKA. Very convenient when no Internet connection is available.",
    p2: "An offline copy is just a single HTML file that contains both the whole OKA web application and your encrypted data, except file attachments.",
    p3: "It is as secure as the hosted OKA service since they both share the same code and security architecture.",
    button: "Download offline copy",
  },

  termination: {
    h2: "Delete Account",
    p1: "Please make sure you have downloaded the latest backup before deleting your account.",
    check: "All my data will be permanently deleted. I understand that this action cannot be undone or canceled.",
    button: "Terminate"
  },

  /**
   * domain
   */
  card: {
    tags: "Tags",
    archived: "Archived"
  }
}

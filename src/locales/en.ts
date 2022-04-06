const en: {[key: string]: any} = {
  ui: {
    loading: "Loading",
    login: "Log in",
    tag: "Tag",
    or: "Or",
    failed: "Failure",
    yes: "Yes",
    no: "No",
    edit: "Edit",
    toClone: "Clone",
    copied: "Copied",
    copy: "Copy",
    delete: "Delete",
    archive: "Archive",
    restore: "Restore",
    save: "Save",
    cancel: "Close",
    all: "All",
    notes: "Notes",
    create: "Create",
    turnOn: "Enable",
    turnOff: "Disable",
    search: "Search"
  },

  menu: {
    join: "Join.Us",
    login: "Login",
    demo: "Demo",
    features: "Features",
    privacy: "Privacy",
    terms: "Terms of use",
    issues: "Issues",
    status: "Status",
    passphrase: "Password",
    export: "Export",
    import: "Import",
    logout: "Log out",
    preferences: "Settings",
    security: "Security",
    share: "Share"
  },

  spaceMenu: {
    userID: "Your UserID is: {id}"
  },


  hello: {
    h2: "Free, open source and anonymous password manager with e2e encryption_"
  },

  join: {
    h1: "Account",
    title: "Sign up",
    step1: "Generation of SRP keys",
    step2: "Generation of master keys",
    step3: "Generation of RSA keys",
  },

  joinForm: {
    step0: "Enter your credentials",
    step1: "Confirm your password",
    step2: "Familiarize yourself with the rules of the service",
    check0: `I understand that <i>Wault</i> cannot restore the lost password `,
    check1: `I’ve read and I agree with <a target="_blank" href="{url}"> the rules of the service</a>.`,
  },

  login: {
    h1: "Login",
    title: "Login",
    auth0: "SRP#0",
    auth1: "SRP#1"
  },

  spa: {
    title: "Wault Offline Copy"
  },

  space: {
    titleTemplate: "%s ✲ workspace",
  },

  spaceLeft: {
    workspaces: "Workspaces",
  },

  spaceForm: {
    title: "Title",
    label: "Label",
    value: "Value",
  },

  export: {
    h1: "Offline copy",
    p1: "Download the offline copy of your Wault account. It’s very convenient when you don’t have access to the Internet.",
    p2: "The offline copy is just a single HTML file that contains both the entire Wault web application and all your encrypted data.",
    p3: "The copy is as secure as the Wault cloud service, because it uses the same code and encryption architecture.",
    button: "Download",
  },

  termination: {
    h1: "Delete account",
    p1: "Make sure that you downloaded the latest offline copy of your account before deleting the account.",
    check: "All my data will be irretrievably deleted. I understand that this action cannot be undone.",
    button: "Delete forever"
  },

  mfa: {
    h1: "Two Factor Authentication",
    p1: "Turn on more reliable account protection - attackers will not be able to access it, even if they find out the password. When this feature is enabled, two components are used to sign in: a password and a one-time code.",
    p2: "For the second authentication step, we recommend using the Authy app or Google Authenticator.",
  },

  mfaEnable: {
    p1Html: `Scan the QR code in the multi-factor authentication app, or add the secret manually: <span data-cy="secret" class="text-break text-white">{secret}</span>`,
    p2: "Keep the secret in a safe place, if you lose your phone, access to your account will become impossible.",
    check: "I understand that I will lose access to my account if the second factor is lost",
  },

  workspaceList: {
    h1: "Workspace",
    p1: "Create your first workspace for password, account data, and notes management"
  },

  share: {
    h1: "Share Workspace",
    p1: "Share this workspace with your coworkers or teammates. The user will be able to read, modify and export workspace but can not delete, rename or re-share the workspace.",
    p2: "This workspace is currently shared with (click to remove)"
  },

  dialog: {
    deleteCard: "Delete?",
    archiveCard: "Archive?",
    deleteWorkspaceHtml: "To delete workspace,<br>enter its title",
    renameWorkspace: "Rename workspace",
    createWorkspace: "Create workspace",
    areYouSure: "Are you sure?",
    disableMfa: "Disable MFA?"
  },

  panelPassphrase: {
    h1: "Change password",
    p1: " Change your password from time to time, it's basic security.",
    check: "I understand that Wault can’t restore my lost password"
  },

  /**
   * domain
   */
  card: {
    tags: "Tags",
    archived: "Archive"
  },

  workspace: {
    title: "Title"
  },

  user: {
    id: "UserID",
    oldUsername: "Old username",
    newUsername: "New username",
    newPassword: "New password",
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm the password",
    otpPasscode: "One-Time Password",
    otpDigits: "6 numbers",
  }
}

export default en

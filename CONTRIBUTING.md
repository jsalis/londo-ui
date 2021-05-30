# Contributing

## Commit Messages

A commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]
```

Only the **type** and **description** are mandatory.

A **scope** may be added to a commit’s type, to provide additional contextual information and is contained within parenthesis. Example: `feat(parser): add ability to parse arrays`

The **body** may include details and motivation for the change, if necessary.

A Jira issue number may be added to the end of the **description** or the **body**. It is prepended with a `#` and will be replaced with a link in the generated changelog. Example: `feat: add cool feature #IO-3530`

#### Type

If the prefix is `feat`, `fix`, `perf`, `build` or `test`, the commit message will appear in the changelog.

- **feat**: a new feature
- **fix**: a bug fix
- **docs**: documentation only changes
- **style**: changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: a code change that neither fixes a bug nor adds a feature
- **perf**: a code change that improves performance
- **test**: adding missing tests or correcting existing tests
- **build**: changes that affect the build system or external dependencies
- **ci**: changes to CI configuration files and scripts
- **chore**: other changes that don't modify src or test files
- **revert**: reverts a previous commit

#### Why Use Conventional Commits?

- Automatically generating CHANGELOGs.
- Automatically determining a semantic version bump (based on the types of commits landed).
- Communicating the nature of changes to teammates and other stakeholders.
- Triggering build and publish processes.
- Making it easier for people to contribute, by allowing them to explore a more structured commit history.

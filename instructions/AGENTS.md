### Working with me

- You might be running in the herdr terminal multiplexer. You can tell by the
  presence of the `HERDR_SOCKET_PATH` environment variable. If so, then you
  should load the skill with `herdr --skill` (prints the actual skill text)

- Use hunk for code reviews. Run `hunk skill path` to find the skill. If there's
  no hunk session yet, and you're running in herdr, then launch hunk in a new
  tab. Otherwise, give me the hunk command to start the session.

- Don't apologize for misunderstandings, instead recommend a specific
  change to `AGENTS.md` that would improve things for the future.

- When asked to "advise," "assess," "examine," "review," "look at," "check,"
  or similar, investigate freely (reading, searching, running read-only
  commands) but produce findings only — don't edit files unless explicitly
  told to fix, apply, or implement.

### Coding style

- Follow YAGNI principles.

- Prefer shorter solutions.

- When adding new functions or methods, or updating existing ones, always add or
  update the docstring (clojure), javadoc (java), jsdoc (js, ts), etc.

- Comments are the exception, not the default. Add one only when it conveys
  something the code can't: the WHY, a non-obvious consequence, or a pointer to
  related code elsewhere — especially in a different language, or a distant
  part of the tree. If a comment would just restate the next line in English,
  skip it. Don't add a comment just because a line changed. (This is about
  inline comments; docstrings/javadoc/jsdoc above are still mandatory per the
  previous rule.)

- In Clojure, all comments should use a single semicolon leader instead of
  multiple, regardless of where they are in the indentation structure.

- In Java, always use braces for control flow statements: Always enclose the
  body of if, else, for, do, and while statements in curly braces ({ ... }),
  even when the body contains only a single line. Never write single-line or
  unbraced control flow blocks.

- The same rule applies to JavaScript, except short one-line early-return
  conditionals are okay, for example `if (!foo) return null`

(function (Prism) {
	// 定义Diff语言的语法规则
	Prism.languages.diff = {
		'coord': [
			// Match all kinds of coord lines (prefixed by "+++", "---" or "***")
			/^(?:\+{3}|-{3}|\*{3}).*$/m,
			// Match "@@ ... @@" coord lines in unified diff
			/^@@.*@@$/m,
			// Match coord lines in normal diff (starts with a number)
			/^\d.*$/m
		],

		// Match inserted and deleted lines. Support both +/- and >/< styles
		'deleted': /^[-<].*$/m,
		'inserted': /^[+>].*$/m,

		// Match "diff" prefixed patterns (index, etc)
		'diff': {
			'pattern': /^diff.*$/m,
			'alias': 'keyword'
		},

		// Match lines that are not inserted or deleted
		'normal': /^(?![-+<>@]).*$/m
	};

	// Add a Diff Highlight plugin
	var LANGUAGE_REGEX = /diff-([\w-]+)/i;
	var HTML_TAG = /<\/?(?!\d)[^\s>/=$<%]+(?:\s(?:\s*[^\s>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/gi;
	var LANGUAGE_ALIAS = {
		'html': 'markup',
		'xml': 'markup',
		'svg': 'markup',
		'mathml': 'markup',
		'js': 'javascript',
		'css': 'css',
		'clike': 'clike',
		'c': 'clike'
	};

	Prism.hooks.add('before-sanity-check', function (env) {
		var lang = env.language;
		if (LANGUAGE_REGEX.test(lang) && !env.grammar) {
			env.grammar = Prism.languages.diff;
		}
	});

	Prism.hooks.add('before-tokenize', function (env) {
		var lang = env.language;
		if (LANGUAGE_REGEX.test(lang) && !Prism.languages[lang]) {
			Prism.languages[lang] = Prism.languages.diff;
		}
	});

	Prism.hooks.add('wrap', function (env) {
		var diffLanguage, diffCode;

		if (env.language !== 'diff') {
			return;
		}

		if (env.type === 'deleted') {
			// Handle deleted lines
			diffLanguage = (env.content.replace(HTML_TAG, '').match(LANGUAGE_REGEX) || [])[1];
			diffCode = env.content.replace(/<(\/)?\w+(?:\s[^>]*)?>/g, '');
			
			if (diffLanguage) {
				env.classes.push('diff-' + diffLanguage);
			}
		}
		else if (env.type === 'inserted') {
			// Handle inserted lines
			diffLanguage = (env.content.replace(HTML_TAG, '').match(LANGUAGE_REGEX) || [])[1];
			diffCode = env.content.replace(/<(\/)?\w+(?:\s[^>]*)?>/g, '');
			
			if (diffLanguage) {
				env.classes.push('diff-' + diffLanguage);
			}
		}
	});

})(Prism); 
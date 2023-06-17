# Get Started

## Usage

    import Cookie from 'cookie-ts'

    Cookie.parse('a=1'); // {a: 1}

    Cookie.clear('a');
    Cookie.get('a'); // ""

    Cookie.check('a', 'test', 2, true);
    Cookie.check('a', 'test', 2);

    Cookie.set('a', 567);
    Cookie.get('a');

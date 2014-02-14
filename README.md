# App.net Comments Widget

The Comments Widget builds on top of the App.net API to create a hosted open source comments widget.

## Quickstart Guide

While you can host the whole plugin yourself, you can also just use the App.net hosted version. Here's how.

Decide if you want to use one of the configuration variables.

* **comments_url**: _(optional default: current url)_ For which URL should comments be displayed.
* **default_at_reply**: _(optional)_ Default user to @mention when a comment is created.
* **body_font_color**: _(optional defualt: #333)_ Main font color.
* **link_font_color**: _(optional defualt: #428bca)_ Font color of links.
* **accent_color**: _(optional defualt: #ccc)_ Color used for accents.
* **font_family**: _(optional defualt: "Helvetica Neue",Helvetica,Arial,sans-serif)_ Main font-family.

If you don't end up using any of the configuration variables, don't worry about including the first script block;

```html
<script>
  var ADN_COMMENTS_CONFIG = {
    // comments_url: 'http://rumproarious.com/2014/02/06/try-out-the-app-dot-net-comments-widget/',
    // default_at_reply: 'voidfiles'
  };
</script>
<script src="https://d105v2jof9gtr3.cloudfront.net/embed.js" id='adn-comments'></script>
```

Thats it! Just copy and paste this onto your website where you want to comments to show up.

## Contibuting

If you would like to contribute to the project (or host it yourself) here is the guide to getting it up an running.

**You are going to need a few things.**

* **An App.net developer account** - You will need an App.net developer account.
* **Node.js, npm, and Grunt** - You will need Node.js, npm, and Grunt installed for the build process to work. If you don't already have Node.js and npm installed you can follow this guide from Joyent [Installing Node and npm](http://www.joyent.com/blog/installing-node-and-npm). You'll also need [Grunt](http://gruntjs.com/), a Javascript build tool that's similar to rake. To install it, follow this [getting started guide](http://gruntjs.com/getting-started).
* **Compass** - We are also using [Compass](http://compass-style.org/) to compile sass to css. To install Compass, follow the [Compass install guide](http://compass-style.org/install/).

**Create an App.net App**

Create an App.net app by going to https://account.app.net/developer/apps/ and clicking "Create An App." Make sure to add http://localhost:9000 as a redirect URI. Be sure to note your Client ID -- you'll need it in a second.

**Setup the client-side app**

The first step here is to get your node environment up and running.

You will need to edit `Gruntfile.js`. Modify the part below; the `client_id` variable is given to you when you create an app, and the `redirect_uri` variable is what you entered for the redirect URI.

```js
  var defaultAppConfig = {
    app_root_url: 'http://127.0.0.1:9000',
    client_id: 'q6BSdP5DctemahG9EDZVAmCv2x2dbjZJ',
    redirect_uri: 'http://127.0.0.1:9000/auth.html',
    valid_config_keys: [
      'comments_root',
      'comments_url',
      'default_at_reply',
      'comments_origin'
    ]
  };
```

Once you have modified Gruntfile.js, we can install all the dependencies. This all assumes your in the root of the repository. Run these commands:

```sh
npm install    # install the node dependencies
bower install  # install the client-side dependencies
grunt server   # Should start a development server at http://localhost:9000
```

Now visit http://localhost:9000/test.html and you should see a version of the comments widget.

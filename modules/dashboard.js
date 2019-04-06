/* 
DASHBOARD EXAMPLE

  Install the following for dashboard stuff.
  npm install body-parser ejs express express-passport express-session
  npm install level-session-store marked passport passport-discord
  
This is a very simple dashboard example, but even in its simple state, there are still a
lot of moving parts working together to make this a reality. I shall attempt to explain
those parts in as much details as possible, but be aware: there's still a lot of complexity
and you shouldn't expect to really understand all of it instantly.

Pay attention, be aware of the details, and read the comments. 

Note that this *could* be split into multiple files, but for the purpose of this
example, putting it in one file is a little simpler. Just *a little*.
*/

// Native Node Imports
const url = require("url");
const path = require("path");

// Used for Permission Resolving...
const Discord = require("discord.js");

// Express Session
var express = require('express');
var app = express();
const moment = require("moment");
require("moment-duration-format");

// Express Plugins
// Specifically, passport helps with oauth2 in general.
// passport-discord is a plugin for passport that handles Discord's specific implementation.
// express-session and level-session-store work together to create persistent sessions
// (so that when you come back to the page, it still remembers you're logged in).
const passport = require("passport");
const session = require("express-session");
const LevelStore = require("level-session-store")(session);
const Strategy = require("passport-discord").Strategy;

// Helmet is specifically a security plugin that enables some specific, useful 
// headers in your page to enhance security.
const helmet = require("helmet");

// Used to parse Markdown from things like ExtendedHelp
const md = require("marked");

module.exports = (client) => {
  // It's easier to deal with complex paths. 
  // This resolves to: yourbotdir/dashboard/
  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);

  // This resolves to: yourbotdir/dashboard/templates/ 
  // which is the folder that stores all the internal template files.
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

  // The public data directory, which is accessible from the *browser*. 
  // It contains all css, client javascript, and images needed for the site.
  app.use("/public", express.static(path.resolve(`${dataDir}${path.sep}public`)));

  // These are... internal things related to passport. Honestly I have no clue either.
  // Just leave 'em there.
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  /* 
  This defines the **Passport** oauth2 data. A few things are necessary here.
  
  clientID = Your bot's client ID, at the top of your app page. Please note, 
    older bots have BOTH a client ID and a Bot ID. Use the Client one.
  clientSecret: The secret code at the top of the app page that you have to 
    click to reveal. Yes that one we told you you'd never use.
  callbackURL: The URL that will be called after the login. This URL must be
    available from your PC for now, but must be available publically if you're
    ever to use this dashboard in an actual bot. 
  scope: The data scopes we need for data. identify and guilds are sufficient
    for most purposes. You might have to add more if you want access to more
    stuff from the user. See: https://discordapp.com/developers/docs/topics/oauth2 

  See config.js.example to set these up. 
  */
  passport.use(new Strategy({
    clientID: client.user.id,
    clientSecret: client.config.dashboard.oauthSecret,
    callbackURL: client.config.dashboard.callbackURL,
    scope: ["identify", "guilds"]
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));

  
  // Session data, used for temporary storage of your visitor's session information.
  // the `secret` is in fact a "salt" for the data, and should not be shared publicly.
  app.use(session({
    secret: client.config.dashboard.sessionSecret,
    resave: false,
    saveUninitialized: false,
  }));

  // Initializes passport and session.
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());

  // The domain name used in various endpoints to link between pages.
  app.locals.domain = client.config.dashboard.domain;
  
  // The EJS templating engine gives us more power to create complex web pages. 
  // This lets us have a separate header, footer, and "blocks" we can use in our pages.
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  // body-parser reads incoming JSON or FORM data and simplifies their
  // use in code.
  var bodyParser = require("body-parser");
  app.use(bodyParser.json());       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
  
   function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/giris");
  }

  // This function simplifies the rendering of the page, since every page must be rendered
  // with the passing of these 4 variables, and from a base path. 
  // Objectassign(object, newobject) simply merges 2 objects together, in case you didn't know!
  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };


  /** PAGE ACTIONS RELATED TO SESSIONS */

  // The login page saves the page the person was on in the session,
  // then throws the user to the Discord OAuth2 login page.
  app.get("/giris", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }
    next();
  },
  passport.authenticate("discord"));

  app.get("/baglanti-hatası", (req, res) => {
    renderTemplate(res, req, "autherror.ejs");
  });
  
  // Once the user returns from OAuth2, this endpoint gets called. 
  // Here we check if the user was already on the page and redirect them
  // there, mostly.
  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), async (req, res) => {
    if (client.ayarlar.sahip.includes(req.user.id)) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
  });
  
  // If an error happens during authentication, this is what's displayed

  // Destroys the session to log out the user.
  app.get("/cikis", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/"); //Inside a callback… bulletproof!
    });
  });

  /** REGULAR INFORMATION PAGES */

  // Index page. If the user is authenticated, it shows their info
  // at the top right of the screen.
  app.get("/", (req, res) => {
     renderTemplate(res, req, "index.ejs");
  });
  
  app.get("/tesekkurler", (req, res) => {
    renderTemplate(res, req, "tesekkur.ejs")
  });

  // The list of commands the bot has. Current **not filtered** by permission.
  app.get("/komutlar", (req, res) => {
    renderTemplate(res, req, "commands.ejs", {md});
  });
  
  
  app.get("/kullaniciler/:user.id/yonet",  (req, res) => {
    const user = client.users.get(req.params.user.id);
    if (!user) return res.json({"hata":"Bot "+req.params.user.id+" ID adresine sahip bir kullanıcıyı göremiyor."});
    if (req.user.id !== req.user.id) return res.json({"hata":"Başkasının kullanıcı ayarlarına dokunamazsın."});
    renderTemplate(res, req, "k-panel.ejs", {user});
  });
  
  
  // Bot statistics. Notice that most of the rendering of data is done through this code, 
  // not in the template, to simplify the page code. Most of it **could** be done on the page.
  app.get("/istatistikler", (req, res) => {
    const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
    const members = client.guilds.reduce((p, c) => p + c.memberCount, 0);
    const channels = client.channels.size;
    const guilds = client.guilds.size;
    renderTemplate(res, req, "stats.ejs", {
      stats: {
        version: client.ayarlar.versiyon,
        servers: guilds,
        members: members,
        channels: channels,
        uptime: duration,
        memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
        dVersion: Discord.version,
        nVersion: process.version
      }
    });
  });
  
  app.get("/panel", checkAuth, (req, res) => {
    const perms = Discord.EvaluatedPermissions;
    renderTemplate(res, req, "dashboard.ejs", {perms});
  });
  
  app.get("/user/:userID", checkAuth, (req, res) => {
    const perms = Discord.EvaluatedPermissions;
    const member = client.users.get(req.params.userID);
    renderTemplate(res, req, "user.ejs", {member});
  });
  
   app.post("/user/:userID", checkAuth, (req, res) => {
    const member = client.users.get(req.params.userID);
    client.userAyarlar(member.id, req.body);
    res.redirect("/user/"+req.params.userID);
  });
  
  // The Admin dashboard is similar to the one above, with the exception that
  // it shows all current guilds the bot is on, not *just* the ones the user has
  // access to. Obviously, this is reserved to the bot's owner for security reasons.
  app.get("/yonetici", checkAuth, (req, res) => {
    if (!req.session.isAdmin) return res.redirect("/");
    renderTemplate(res, req, "adminim.ejs");
  });
  
  // Simple redirect to the "Settings" page (aka "manage")
  app.get("/panel/:guildID", checkAuth, (req, res) => {
    res.redirect(`/panel/${req.params.guildID}/ayarlar`);
  });

  // Settings page to change the guild configuration. Definitely more fancy than using
  // the `set` command!
  app.get("/panel/:guildID/ayarlar", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
    renderTemplate(res, req, "guild/manage.ejs", {guild});
  });
  
  
  app.get("/panel/:guildID/ayarlar/ayar=genel", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
    renderTemplate(res, req, "guild/genel.ejs", {guild});
  });
  
  app.get("/panel/:guildID/ayarlar/ayar=giriscikis", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
    renderTemplate(res, req, "guild/gc.ejs", {guild});
  });
  
  app.get("/panel/:guildID/ayarlar/ayar=kayitlar", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
    renderTemplate(res, req, "guild/kayitlar.ejs", {guild});
  });
  
  app.get("/panel/:guildID/ayarlar/ayar=otorol", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
    renderTemplate(res, req, "guild/otorol.ejs", {guild});
  });
  
  app.get("/panel/:guildID/ayarlar/ayar=tag", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
    renderTemplate(res, req, "guild/tag.ejs", {guild});
  });
  
  app.get("/panel/:guildID/ayarlar/ayar=filtreler", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
    renderTemplate(res, req, "guild/filtre.ejs", {guild});
  });
  
  app.get("/panel/:guildID/ayarlar/ayar=sayac", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
    renderTemplate(res, req, "guild/sayac.ejs", {guild});
  });
  
  app.get("/panel/:guildID/ayarlar/ayar=desteksistemi", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
    renderTemplate(res, req, "guild/destek.ejs", {guild});
  });
  
  app.get("/panel/:guildID/ayarlar/ayar=davetsistemi", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
    renderTemplate(res, req, "guild/davet.ejs", {guild});
  });
  //postlar 
  app.post("/panel/:guildID/ayarlar/ayar=genel", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
   
    client.writeSettings(guild.id, req.body);
    res.redirect("/panel/"+req.params.guildID+"/ayarlar/ayar=genel");
  });
  
  app.post("/panel/:guildID/ayarlar/ayar=giriscikis", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
   
    client.writeSettings(guild.id, req.body);
    res.redirect("/panel/"+req.params.guildID+"/ayarlar/ayar=giriscikis");
  });
  
  app.post("/panel/:guildID/ayarlar/ayar=kayitlar", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
   
    client.writeSettings(guild.id, req.body);
    res.redirect("/panel/"+req.params.guildID+"/ayarlar/ayar=kayitlar");
  });
  
  app.post("/panel/:guildID/ayarlar/ayar=otorol", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
   
    client.writeSettings(guild.id, req.body);
    res.redirect("/panel/"+req.params.guildID+"/ayarlar/ayar=otorol");
  });
  
  app.post("/panel/:guildID/ayarlar/ayar=tag", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
    
    client.writeSettings(guild.id, req.body);
    res.redirect("/panel/"+req.params.guildID+"/ayarlar/ayar=tag");
  });
  
  app.post("/panel/:guildID/ayarlar/ayar=filtreler", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
   
    client.writeSettings(guild.id, req.body);
    res.redirect("/panel/"+req.params.guildID+"/ayarlar/ayar=filtreler");
  });
  
  app.post("/panel/:guildID/ayarlar/ayar=sayac", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
  
    client.writeSettings(guild.id, req.body);
    res.redirect("/panel/"+req.params.guildID+"/ayarlar/ayar=sayac");
  });
  
  app.post("/panel/:guildID/ayarlar/ayar=desteksistemi", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");

     client.writeSettings(guild.id, req.body);
    res.redirect("/panel/"+req.params.guildID+"/ayarlar/ayar=desteksistemi");
  });
  
   app.post("/panel/:guildID/ayarlar/ayar=davetsistemi", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");

     client.writeSettings(guild.id, req.body);
    res.redirect("/panel/"+req.params.guildID+"/ayarlar/ayar=davetsistemi");
  });
  
   app.get("/hata-yetki", (req, res) => {
    renderTemplate(res, req, "errGuild.ejs");
  });
  
  // When a setting is changed, a POST occurs and this code runs
  // Once settings are saved, it redirects back to the settings page.
  /*app.post("/panel/:guildID/ayarlar", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");

    client.writeSettings(guild.id, req.body);
    res.redirect("/panel/"+req.params.guildID+"/ayarlar");
  });*/
  
   app.get("/panel/:guildID/ozelkomutlar", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");
    renderTemplate(res, req, "guild/customcmd.ejs", {guild});
  });
  
  app.post("/panel/:guildID/ozelkomutlar", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.redirect("/hata-yetki");

    client.customCmds(guild.id, req.body);
    res.redirect("/panel/"+req.params.guildID+"/ozelkomutlar");
  });
  
  // Displays the list of members on the guild (paginated).
  // NOTE: to be done, merge with manage and stats in a single UX page.
  app.get("/panel/:guildID/uyeler", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    renderTemplate(res, req, "guild/members.ejs", {
      guild: guild,
      members: guild.members.array()
    });
  });

  // This JSON endpoint retrieves a partial list of members. This list can
  // be filtered, sorted, and limited to a partial count (for pagination).
  // NOTE: This is the most complex endpoint simply because of this filtering
  // otherwise it would be on the client side and that would be horribly slow.
  app.get("/panel/:guildID/uyeler/liste", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    if (req.query.fetch) {
      await guild.fetchMembers();
    }
    const totals = guild.members.size;
    const start = parseInt(req.query.start, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 50;
    let members = guild.members;
    
    if (req.query.filter && req.query.filter !== "null") {
      //if (!req.query.filtervalue) return res.status(400);
      members = members.filter(m=> {
        m = req.query.filterUser ? m.user : m;
        return m["displayName"].toLowerCase().includes(req.query.filter.toLowerCase());
      });
    }
    
    if (req.query.sortby) {
      members = members.sort((a, b) => a[req.query.sortby] > b[req.query.sortby]);
    }
    const memberArray = members.array().slice(start, start+limit);
    
    const returnObject = [];
    for (let i = 0; i < memberArray.length; i++) {
      const m = memberArray[i];
      returnObject.push({
        id: m.id,
        status: m.user.presence.status,
        bot: m.user.bot,
        username: m.user.username,
        displayName: m.displayName,
        tag: m.user.tag,
        discriminator: m.user.discriminator,
        joinedAt: m.joinedTimestamp,
        createdAt: m.user.createdTimestamp,
        highestRole: {
          hexColor: m.highestRole.hexColor
        },
        memberFor: moment.duration(Date.now() - m.joinedAt).format(" D [gün], H [saat], m [dakika], s [saniye]"),
        roles: m.roles.map(r=>({
          name: r.name,
          id: r.id,
          hexColor: r.hexColor
        }))
      });
    }
    res.json({
      total: totals,
      page: (start/limit)+1,
      pageof: Math.ceil(members.size / limit),
      members: returnObject
    });
  });
  
   app.get("/apitest", (req, res) => {
      res.json({x: 'test'})
   });

  // Displays general guild statistics. 
  app.get("/panel/:guildID/istatistikler", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/stats.ejs", {guild});
  });
  
  // Leaves the guild (this is triggered from the manage page, and only
  // from the modal dialog)
  app.get("/panel/:guildID/leave", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/hata-yetki");
    await guild.leave();
    res.redirect("/panel");
  });
  
  //resets the guild's settings to the defaults, by simply deleting them.
  app.get("/panel/:guildID/reset", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/hata-yetki");
    
    client.ayar.delete(`prefix_${guild.id}`)
    client.ayar.delete(`gc_${guild.id}`)
    client.ayar.delete(`mLog_${guild.id}`)
    client.ayar.delete(`log_${guild.id}`)
    client.ayar.delete(`otoR_${guild.id}`)
    client.ayar.delete(`otoRolK_${guild.id}`)
    client.ayar.delete(`tag_${guild.id}`)
    client.ayar.delete(`tagKanal_${guild.id}`)
    client.ayar.delete(`sRol_${guild.id}`)
    client.ayar.delete(`sKanal_${guild.id}`)
    client.ayar.delete(`sayac_${guild.id}`)
    client.ayar.delete(`girisM_${guild.id}`)
    client.ayar.delete(`cikisM_${guild.id}`)
    client.ayar.delete(`destekK_${guild.id}`)
    client.ayar.delete(`destekR_${guild.id}`)
    client.ayar.delete(`destekM_${guild.id}`)
    client.ayar.delete(`linkE_${guild.id}`)
    client.ayar.delete(`küfürE_${guild.id}`)
    client.ayar.delete(`kFiltre_${guild.id}`)
    client.ayar.delete(`davetK_${guild.id}`)
    
    res.redirect("/panel/"+req.params.guildID);
  });
  
   app.get("/panel/:guildID/ozelkomutlar/sil", checkAuth, async (req, res) => {
     res.redirect("/panel/"+req.params.guildID+"/ozelkomutlar");
   });
  
  const fs = require('fs');
  app.get("/panel/:guildID/ozelkomutlar/sil/:cmdID", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/hata-yetki");
   
    var komut = req.params.cmdID;
    
    let komutlar = client.cmdd
		if(komutlar[req.params.guildID].length === 1) {
			if(Object.keys(komutlar[req.params.guildID][0])[0].toString() === komut) {
				delete komutlar[req.params.guildID]
				fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
					console.log(err)
				})
			}
		} else {
		for (var i = 0; i < komutlar[req.params.guildID].length; i++) {
			if(Object.keys(komutlar[req.params.guildID][i])[0].toString() === komut) {
				komutlar[req.params.guildID].splice(i, 1);

				fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
					console.log(err)
				})
			}
		}
  }
    
    res.redirect("/panel/"+req.params.guildID+"/ozelkomutlar");
  });
  
  client.site = app.listen(process.env.PORT);
  
};

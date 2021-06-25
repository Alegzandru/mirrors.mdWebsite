var feed = new Instafeed({
    accessToken: InstagramToken,
    limit : 12,
    template : '<a href="{{link}}"><img title="{{caption}}" src="{{image}}" /></a>'
});

feed.run();
export default function InstaBlock () {

    fetch('https://ig.instant-tokens.com/users/be3e1147-df3d-4b01-8250-14b5c1d19bb4/instagram/17841409197192960/token.js?userSecret=hk8oewhpx09id27qaonz7',)
        .then(resp => resp.json())
        .then(data => {
            var feed = new Instafeed({
                accessToken: data.Token,
                limit: 12,
                template: '<a href="{{link}}"><img class="image__img  pulse1" title="{{caption}}" src="{{image}}" /><div class="image__overlay"><div class="image__title">{{caption}}</div></div></a>',
            });
        feed.run();
    });

    return (
        <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-140px pb-224px font-Ubuntu bg-ui-dark">
            <div id="instafeed"></div>

            {/* <script src="./instaToken.js"></script> */}

            {/* <script src="./instafeed.min.js"></script> */}

            {/* <script src="./instaFeed.js"></script> */}
        </div>
    )
}
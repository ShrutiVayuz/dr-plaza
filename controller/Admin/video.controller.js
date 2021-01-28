var twilio = require("twilio");

const accountSid = "ACfea4895ef213cd1ad23c67a404b669fe";
const authToken = "7c858af9bc9cbb0419d6c6525d081915";
const twilioApiKey = "SK08f3609e196fce5c9a253788d7686d14";
const twilioApiSecret = "safMYaTyVG3CjhwfXKIGWKxhFgxvU6pP";

const client = twilio(accountSid, authToken);
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

exports.createRoom = async (req, res) => {
    console.log(req.body)
    client.video.rooms.create({
            type: "peer-to-peer",
            uniqueName: req.body.roomId,
        })
        .then((room) => {
            const identity = req.body.userName;
            const videoGrant = new VideoGrant({
            room: req.body.roomId,
            });
            const token = new AccessToken(accountSid, twilioApiKey, twilioApiSecret, {
            identity: identity,
            });
            token.addGrant(videoGrant);
            console.log(token.toJwt());
            res.json({ status: 1, room_name: room.uniqueName, token: token.toJwt() });
        },
        (err) => {
            console.log(err);
        }
        );
};
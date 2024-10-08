import { PropertyDataKey } from "../enums";

export const propertyDescriptions = {
  [PropertyDataKey.POPULARITY]:
    "The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based on the total number of plays the track has had and how recent those plays are. Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past.",
  [PropertyDataKey.ACOUSTICNESS]:
    "A confidence measure from 0 to 100 of whether the track is acoustic. 100 represents high confidence the track is acoustic.",
  [PropertyDataKey.DANCEABILITY]:
    "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0 is least danceable and 100 is most danceable.",
  [PropertyDataKey.ENERGY]:
    "Energy is a measure from 0 to 100 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.",
  [PropertyDataKey.INSTRUMENTALNESS]:
    'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 100, the greater likelihood the track contains no vocal content. Values above 50 are intended to represent instrumental tracks, but confidence is higher as the value approaches 100.',
  [PropertyDataKey.LIVENESS]:
    "Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.",
  [PropertyDataKey.SPEECHINESS]:
    "Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 100 the attribute value. Values above 66 describe tracks that are probably made entirely of spoken words. Values between 33 and 66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 33 most likely represent music and other non-speech-like tracks.",
  [PropertyDataKey.VALENCE]:
    "A measure from 0 to 100 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).",
};

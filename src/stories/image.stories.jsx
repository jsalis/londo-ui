import { Image } from "../components";

export default {
    title: "Design System/Image",
    component: Image,
    parameters: {
        componentSubtitle: "A component to display images.",
    },
};

const exampleSrc =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA40lEQVR4Xo2TsRHCMAxFTcUq2QQaynRhAzoKWu6YgZ4SZnDLMRZCX44cWbETfPdJRKKnLyFCcIcoUEv+3Vm8lBxjJE4QeBP0Oe2pJQXgeRNQc4CqWlmqX/mzdijyEyhZTPejMoTjZvXbsJ2SNj3ZGFVxAPoe76IZyANQ3TvR5FUIBqYAhWj19+5cdwEHKuIWfP9/zUH6wpTRs4Ggf3GV5lA/ffciSAG4Ira/hnFVQjS5BvDgHCvCV/AOPMDtBzam/POsAvz7eT1lWQL3/VxU3tZx2NJJdsHL8zhcCmH6kP3euv4BfkXsap+F6lkAAAAASUVORK5CYII=";

export function Basic(args) {
    return <Image src={exampleSrc} alt="Wario" size={64} pixelated {...args} />;
}

import React from 'react';
import anime from "animejs";
import _ from "lodash";


interface IRevealOptionsSettings {
    direction?: "lr" | "rl" | "tb" | "bt";
    bgColor?: string;
    duration?: number;
    easing?: "linear" | "easeInQuad" | "easeInSine" | "easeOutSine" | "easeInOutSine"
    | "easeInOutQuint" | "easeInCubic" | "easeInOutCubic" | "easeInQuint" | "easeOutQuint"
    | "easeInOutQuint" | "easeInCirc" | "easeOutCirc" | "easeInOutCirc" | "easeInQuad"
    | "easeOutQuad" | "easeInOutQuad" | "easeInQuart" | "easeOutQuart" | "easeInOutQuart"
    | "easeInExpo" | "easeOutExpo" | "easeInOutExpo";
    area?: number;
    delay?: number;
    onCover?: (contentElement?: HTMLElement, revealElement?: HTMLElement) => boolean;
    onStart?: (contentElement?: HTMLElement, revealElement?: HTMLElement) => boolean;
    onComplete?: (contentElement?: HTMLElement, revealElement?: HTMLElement) => boolean;
}

interface IRevealOptionsSettingsState {
    direction: "lr" | "rl" | "tb" | "bt";
    bgColor: string;
    duration: number;
    easing: "linear" | "easeInQuad" | "easeInSine" | "easeOutSine" | "easeInOutSine"
    | "easeInOutQuint" | "easeInCubic" | "easeInOutCubic" | "easeInQuint" | "easeOutQuint"
    | "easeInOutQuint" | "easeInCirc" | "easeOutCirc" | "easeInOutCirc" | "easeInQuad"
    | "easeOutQuad" | "easeInOutQuad" | "easeInQuart" | "easeOutQuart" | "easeInOutQuart"
    | "easeInExpo" | "easeOutExpo" | "easeInOutExpo";
    area: number;
    delay: number;
    onCover: (contentElement?: HTMLElement, revealElement?: HTMLElement) => boolean;
    onStart: (contentElement?: HTMLElement, revealElement?: HTMLElement) => boolean;
    onComplete: (contentElement?: HTMLElement, revealElement?: HTMLElement) => boolean;
}

interface IRevealOptions {
    hidden?: boolean;
    settings?: IRevealOptionsSettings;
}

interface IRevealOptionsState {
    hidden: boolean;
    settings: IRevealOptionsSettingsState;
}

interface ITransformSettings {
    val: string;
    origin: {
        initial: string;
        halfway: string;
    };
}

interface IReveal {
    children: JSX.Element | JSX.Element[];
    animationDone?: (val: boolean) => void;
    halfwayDone?: (val: boolean) => void;
    changeSettings?: IRevealOptions
    fullScreen?: boolean;
}

interface ISettings {
    val: string;
    origin: string;
    origin2: string;
}

interface IAnimationSettings extends IRevealOptionsSettingsState {
    targets: Element | Text | null | any;
    complete: (a: any) => void;
    update?: (a: any) => void;
    scaleX?: [number, number];
    scaleY?: [number, number];
};

export const BlockReveal = ({ children, changeSettings, animationDone, halfwayDone, fullScreen }: IReveal) => {

    const contentElement = React.useRef<HTMLDivElement>(null);
    const revealElement = React.useRef<HTMLDivElement>(null);

    const transitionSettings: {[key: string]: ISettings} = {
        lr: {
            val: "scale3d(1,1,1)",
            origin: "0% 50%",
            origin2: "100% 50%"
        },
        rl: {
            val: "scale3d(1,1,1)",
            origin: "100% 50%",
            origin2: "0% 50%"
        },
        tb: {
            val: "scale3d(1,1,1)",
            origin: "50% 0%",
            origin2: "50% 100%"
        },
        bt: {
            val: "scale3d(1,1,1)",
            origin: "50% 100%",
            origin2: "50% 0%"
        },
        default: {
            val: "scale3d(1,1,1)",
            origin: "0% 50%",
            origin2: "100% 50%"
        }

    }

    const [transformSettings, setTransformSettings] = React.useState<ITransformSettings>({
        val: transitionSettings.lr.val,
        origin: {
            initial: transitionSettings.lr.origin,
            halfway: transitionSettings.lr.origin2
        }
    });

    const [revealSettings, setRevealSettings] = React.useState<IRevealOptionsState>({
        hidden: true,
        settings: {
            area: 0,
            bgColor: "#00C9A7",
            direction: "lr",
            duration: 500,
            easing: "easeInOutExpo",
            delay: 0,
            onCover: function (contentElement, revealElement) { return false },
            onStart: function (contentElement, revealElement) { return false },
            onComplete: function (contentElement, revealElement) { return false }
        }
    });
    const [revealRef, setRevealRef] = React.useState<HTMLDivElement>();
    const [contentRef, setContentRef] = React.useState<HTMLElement>();
    const styles = {
        opacity: 1,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000,
        background: revealSettings.settings.bgColor,
        WebkitTransform: transformSettings.val,
        transform: transformSettings.val,
        WebkitTransformOrigin: transformSettings.origin.initial,
        transformOrigin: transformSettings.origin.initial
    }
    const [contentElementStyles, setContentElementStyles] = React.useState({
        opacity: 0
    });

    function isNotNull<T>(element: T | null | undefined) {
        return (element as T);
    }

    function done() {
        if (animationDone) {
            return animationDone(true);
        }
        return;
    }

    function renderChild() {
        if (halfwayDone) {
            return halfwayDone(true);
        }
        return;
    }

    React.useLayoutEffect(() => {
        if (changeSettings) {
            setRevealSettings(prev => (_.merge(prev, changeSettings)));
        }
    }, [changeSettings])

    React.useEffect(() => {

        setTransformSettings({
            val: transitionSettings[revealSettings.settings.direction].val,
            origin: {
                initial: transitionSettings[revealSettings.settings.direction].origin,
                halfway: transitionSettings[revealSettings.settings.direction].origin2
            }
        });

        setRevealRef(isNotNull(revealElement.current));
        setContentRef(isNotNull(contentElement.current));

        if (revealRef && contentRef) {
            
            contentRef.style.position = "relative";
            if (fullScreen) {
                contentRef.style.width = "100%";
                contentRef.style.height = "100%";
            }
            const animationStepTwo: IAnimationSettings = {
                targets: revealRef,
                ...revealSettings.settings,
                update: function (animation: any) {
                    if (animation.progress > 1) {
                        setContentElementStyles(previousStyles => (Object.assign({}, previousStyles, { opacity: 1 })));
                        renderChild();
                    }
                },
                complete: function () {
                    done();
                }
            };
    
            const animationStepOne: IAnimationSettings = {
                targets: revealRef,
                ...revealSettings.settings,
                complete: function (a: any) {
                    revealRef.style.webkitTransformOrigin = revealRef.style.transformOrigin = transformSettings.origin.halfway;
                    if (typeof revealSettings.settings.onCover === "function") {
                        revealSettings.settings.onCover(contentRef, revealRef);
                    };
                    anime(animationStepTwo);
                }
            };
    
            if (revealSettings.settings.direction === "lr" || revealSettings.settings.direction === "rl") {
                animationStepOne.scaleX = [0, 1];
                animationStepTwo.scaleX = [1, revealSettings.settings.area / 100];
            } else {
                animationStepOne.scaleY = [0, 1];
                animationStepTwo.scaleY = [1, revealSettings.settings.area / 100]
            };
            
            anime(animationStepOne);
        }
    }, [revealRef, contentRef, revealSettings]);

    const child = React.Children.map(children, c => {
        return React.cloneElement(c, { style: contentElementStyles }, [
            c.props.children])
    });

    return (
        <div ref={contentElement} className="content-revealer">
            {child}
            <div ref={revealElement} className="block-revealer" style={{ position: "absolute", ...styles }}></div>
        </div>
    );
}

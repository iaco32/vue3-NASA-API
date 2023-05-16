<template>
    <div class="d-flex aligns-items-center justify-content-center">
        <div id="loader"></div>
    </div>
</template>

<style scoped lang="scss">
// loader animation section
#loader {
    display: block;
    position: absolute;
    height: 50px;
    width: 50px;
    border: 5px solid transparent;
    border-top-color: #000000;
    border-bottom-color: #000000;
    border-radius: 50%;
    -webkit-animation: animateLoader 0.5s linear infinite;
    animation: animateLoader 0.5s linear infinite;
}

#loader:after {
    content: "";
    position: absolute;
    top: 5px;
    right: 5px;
    bottom: 5px;
    left: 5px;
    border: 5px solid transparent;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.25);
    -webkit-animation: animateLoader_after 1s linear infinite;
    animation: animateLoader_after 1s linear infinite;
}

@keyframes animateLoader {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    50% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes animateLoader_after {
    0% {
        border-top: 5px solid #000000;
        border-bottom: 5px solid #000000;
    }

    50% {
        border-top: 5px solid rgba(0, 0, 0, 0.25);
        border-bottom: 5px solid rgba(0, 0, 0, 0.25);
    }

    100% {
        border-top: 5px solid #000000;
        border-bottom: 5px solid #000000;
    }
}

@-webkit-keyframes animateLoader {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    50% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@-webkit-keyframes animateLoader_after {
    0% {
        border-top: 5px solid #000000;
        border-bottom: 5px solid #000000;
    }

    50% {
        border-top: 5px solid rgba(0, 0, 0, 0.25);
        border-bottom: 5px solid rgba(0, 0, 0, 0.25);
    }

    100% {
        border-top: 5px solid #000000;
        border-bottom: 5px solid #000000;
    }
}
</style>

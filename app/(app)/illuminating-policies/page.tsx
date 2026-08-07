'use client'
import React, { useState } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { Scrollama, Step, StepData } from 'react-scrollama';

export default function ScrollyTelling() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [, setCurrentStepIndexFlying] = useState<number>(0);
  const [currentStepIndexSignature, setCurrentStepIndexSignature] = useState<number>(0);
  const [currentStepIndexMaya, setCurrentStepIndexMaya] = useState<number>(0);
  const [currentStepIndexPhotos, setCurrentStepIndexPhotos] = useState<number>(0);
  const [currentStepIndexCharts, setCurrentStepIndexCharts] = useState<number>(0);
  const [currentStepIndexEnding, setCurrentStepIndexEnding] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [progressSignature, setProgressSignature] = useState<number>(0);
  const [progressMaya, setProgressMaya] = useState<number>(0);
  const [progressPhotos, setProgressPhotos] = useState<number>(1);
  const [progressCharts, setProgressCharts] = useState<number>(0);
  const [progressEyes, setProgressEyes] = useState<number>(0);
  const [progressScreen, setProgressScreen] = useState<number>(0);
  const [progressEnding, setProgressEnding] = useState<number>(0);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }: StepData) => {
    setCurrentStepIndex(data);
  };

  const onStepEnterFlying = ({ data }: StepData) => {
    setCurrentStepIndexFlying(data);
  };


  const piecewiseInterp = (x: number) => {
		// clamp input just in case
		if (x < 0) x = 0;
		if (x > 1) x = 1;

		if (x <= 0.4) {
			// Linear from 0 at x=0 to 1 at x=0.3
			return x / 0.4;
		} else if (x <= 0.7) {
			// Flat at 1 between 0.3 and 0.7
			return 1;
		} else if (x <= 0.9) {
			// Linear from 1 at x=0.7 to 0 at x=.9
			return 0.9 - (x - 0.7) / 0.2;
		} else {
      // Flat at 0 between 0.9 and 1
      return 0;
    }
	};

  const onStepProgressFlying = ({ progress }: { progress: number }) => {
    setProgress(progress);
  };

  const onStepProgressEyes = ({ progress }: { progress: number }) => {
    setProgressEyes(progress);
  };

  const onStepProgressScreen = ({ progress }: { progress: number }) => {
    setProgressScreen(progress);
  };

  const onStepProgressSignature = ({ progress }: { progress: number }) => {
    setProgressSignature(progress);
  };

  const onStepEnterSignature = ({ direction, data, element }: { direction: string; data: number; element: HTMLElement }) => {
    setCurrentStepIndexSignature(data);
    const target = element.querySelector('.target') as HTMLElement | null;
    if (direction === 'up') {
      setProgressSignature(1);
      target?.style.setProperty('opacity', '');
      target?.classList.remove('opacity-0');
    }
    if (direction === 'down') {
      setProgressSignature(0);
    }
  };

  const onStepExitSignature = ({ direction, element }: { data: number; direction: string; element: HTMLElement }) => {
    const target = element.querySelector('.target') as HTMLElement | null;
    if (direction === 'up') {
      setProgressSignature(1);
      target?.classList.add('opacity-0');
      target?.classList.remove('opacity-100');
      target?.style.setProperty('opacity', '');
    }
    if (direction === 'down') {
      target?.classList.remove('opacity-0');
      target?.classList.add('opacity-100');
      setProgressSignature(0);
    }
  };

  const onStepProgressPhotos = ({ progress }: { progress: number }) => {
    setProgressPhotos(progress);
  };

  const onStepProgressMaya = ({ progress }: { progress: number }) => {
    setProgressMaya(progress);
  };

  const onStepEnterMaya = ({ direction, data, element }: { direction: string; data: number; element: HTMLElement }) => {
    setCurrentStepIndexMaya(data);
    if (direction === 'up') {
      element.querySelector('.target')?.classList.remove('opacity-0');
    }
    if (direction === 'down') {
      setProgressMaya(0);
    }
  };

  const onStepExitMaya = ({ direction, element }: { direction: string; element: HTMLElement }) => {
    const target = element.querySelector('.target') as HTMLElement | null;
    if (direction === 'up') {
      target?.classList.add('opacity-0');
      target?.style.setProperty('opacity', '');
    }
    if (direction === 'down') {
      target?.classList.remove('opacity-0');
    }
  };

  const calculateOpacity = (index: number) => {
    if (currentStepIndexSignature < index) {
      return 0;
    } else if (currentStepIndexSignature === index && progressSignature < 1) {
      return progressSignature;
    } else if (currentStepIndexSignature > index) {
      return 1;
    } else {
      return 1;
    }
  };

  const calculateOpacityMaya = (index: number) => {
    if (currentStepIndexMaya < index) {
      return 0;
    } else if (currentStepIndexMaya === index && progressMaya < 1) {
      return progressMaya;
    } else if (currentStepIndexMaya > index) {
      return 1;
    } else {
      return 1;
    }
  };


  const calculateOpacityPhotos = (index: number) => {
    if (currentStepIndexPhotos < index) {
      return 1;
    } else if (currentStepIndexPhotos === index && progressPhotos < 1) {
      return 1 - progressPhotos;
    } else if (currentStepIndexPhotos > index) {
      return 0;
    } else {
      return 0;
    }
  };

  const onStepEnterPhotos = ({ direction, data }: { direction: string; data: number }) => {
    setCurrentStepIndexPhotos(data);
    if (direction === 'down') {
      setProgressPhotos(0);
    }
    if (direction === 'up') {
      setProgressPhotos(1);
    }
  };

  const onStepExitPhotos = ({ direction }: { direction: string }) => {
    if (direction === 'up') {
      setProgressPhotos(1);
    }
  };

  const onStepProgressCharts = ({ progress }: { progress: number }) => {
    setProgressCharts(progress);
  };

  const onStepEnterCharts = ({ direction, data, element }: { direction: string; data: number; element: HTMLElement }) => {
    setCurrentStepIndexCharts(data);
    if (direction === 'up') {
      element.querySelector('.target')?.classList.remove('opacity-0');
    }
    if (direction === 'down') {
      setProgressCharts(0);
    }
  };

  const onStepExitCharts = ({ direction, element }: { direction: string; element: HTMLElement }) => {
    const target = element.querySelector('.target') as HTMLElement | null;
    if (direction === 'up') {
      target?.classList.add('opacity-0');
      target?.style.setProperty('opacity', '');
    }
    if (direction === 'down') {
      target?.classList.remove('opacity-0');
    }
  };

  const calculateOpacityCharts = (index: number) => {
    if (currentStepIndexCharts < index) {
      return 0;
    } else if (currentStepIndexCharts === index && progressCharts < 1) {
      return progressCharts;
    } else if (currentStepIndexCharts > index) {
      return 1;
    } else {
      return 1;
    }
  };

  const onStepProgressEnding = ({ progress }: { progress: number }) => {
    setProgressEnding(progress);
  };

  const onStepEnterEnding = ({ direction, data, element }: { direction: string; data: number; element: HTMLElement }) => {
    setCurrentStepIndexEnding(data);
    if (direction === 'up') {
      element.querySelector('.target')?.classList.remove('opacity-0');
    }
    if (direction === 'down') {
      setProgressEnding(0);
    }
  };

  const onStepExitEnding = ({ direction, element }: { direction: string; element: HTMLElement }) => {
    const target = element.querySelector('.target') as HTMLElement | null;
    if (direction === 'up') {
      target?.classList.add('opacity-0');
      target?.style.setProperty('opacity', '');
    }
    if (direction === 'down') {
      target?.classList.remove('opacity-0');
    }
  };

  const calculateOpacityEnding = (index: number) => {
    if (currentStepIndexEnding < index) {
      return 0;
    } else if (currentStepIndexEnding === index && progressEnding < 1) {
      return progressEnding;
    } else if (currentStepIndexEnding > index) {
      return 1;
    } else {
      return 1;
    }
  };
  return (
    <div className="scrolly-telling h-full flex flex-col items-center bg-[#281F29]">
      <ParallaxProvider>
        <div className="w-full h-full flex items-center justify-center">
          <div id="scrolly" className="w-full inline-flex flex-col justify-start items-center">
            <div className="bg-black w-full">
              <div className="scrolly-fade-nav bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red py-[3rem] self-stretch text-center justify-center items-center flex text-white text-xl font-normal font-['Source_Sans_3'] leading-8">
                <img className="w-full max-w-[315px]" src="/scrolly/mini-project-logo.svg" alt="Berkman Klein Center logo with adjacent text, stating “A mini project from the Berkman Klein Center for Internet and Society at Harvard University”" />
              </div>
            </div>
            <div className="scrolly-hero-bg-container w-full h-full">
              <div className="px-[2rem] scrolly-hero-bg w-full h-full flex flex-col items-center opacity-100 bg-gradient-to-b from-black to-black/0">
                <div className="scrolly-fade-text max-w-[952px] inline-flex flex-col justify-start items-center gap-9">
                  <div className="self-stretch flex flex-col justify-start items-start gap-3">
                    <div className="self-stretch mt-[3rem] text-center justify-start text-white text-3xl md:text-6xl font-normal font-['Gotham'] md:leading-[62px]">Illuminating the Fine Print That Governs Your Digital Life</div>
                  </div>
                  <div className="max-w-[668px] text-center justify-start text-white text-xl font-normal font-['Source_Sans_3'] leading-8">What can we do when the rules that shape our lives online become too complicated to keep track? Transparency Hub is a resource designed to help people explore, compare, and better understand how social and technology platforms’ policies evolve over time.</div>
                  <div className="max-w-[668px] text-center justify-start"><span className="text-white text-xl font-normal font-['Source_Sans_3'] leading-8"><br/></span><span className="text-white text-xl font-normal font-['Source_Sans_3'] leading-8"><em>This story follows fictional characters, but it’s grounded in challenges that millions of online platform users face every day.</em><br/></span><span className="text-white text-xl font-normal font-['Source_Sans_3'] leading-8"></span></div>
                </div>
              </div>
            </div>

            { /* Bob Chen */ }

            <div className="mt-[5rem] px-[2rem] scrolly-fade-text w-96 text-center justify-start text-white text-4xl font-black font-['Gotham'] leading-[55px] md:mt-[5rem]">Meet Bob Chen</div>
            <div className="px-[2rem] scrolly-fade-text max-w-[710px] text-center justify-start text-white text-3xl font-normal font-['Source_Sans_3'] leading-[48px]">It’s 2002. Bob is a high school history teacher who wants to start a science fiction book club in his neighborhood.<p>&nbsp;</p></div>
            <img className="w-full scrolly-fade-image max-w-[668px] mb-[700px]" src="/scrolly/001-bob.png" alt="Illustration of a high school history teacher in his classroom with posters on the wall depicting a protest image and classical columns. Stickers with science fiction references decorate his shirt and early 2000s computer." />

            { /* Begin Scrolly */ }
            <div className="container" style={{ padding: '40vh 2vw 20vh',  display: 'flex', justifyContent: 'space-between', marginTop: '-80vh' }}>
              <div className="scroller" style={{ flexBasis: '45%' }}>
                <Scrollama offset={0.5} onStepEnter={onStepEnter}>
                  <Step data={0} key={0}>
                    <div
                      style={{
                        margin: '50vh 0 30vh 0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      className="pl-10 max-w-[710px] text-center justify-start text-white text-3xl font-normal leading-[48px]"><img src="/scrolly/004-01.png" alt="Illustration of a man viewing a vintage computer monitor displaying a community website with “sci-fi bookclub” written above a “create group” button." /></div>
                  </Step>
                  <Step data={1} key={1}>
                    <div
                      style={{
                        margin: '30vh 0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      className="pl-10 max-w-[710px] text-center justify-start text-white text-3xl font-normal leading-[48px]"><img src="/scrolly/004-02.png" alt="Illustration of a scroll document labeled “Privacy Policy” with a 5-minute timer icon." /></div>
                  </Step>
                </Scrollama>
              </div>
              <div style={{
                flexBasis: '60%',
                position: 'sticky',
                width: '100%',
                height: '60vh',
                top: '20vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                }} className="w-96 justify-start text-white text-4xl font-black font-['Gotham'] leading-[55px]">
                <div style={{ opacity: currentStepIndex >= 0 ? 1 : 0 }} className="max-w-[521px] justify-start text-white text-2xl font-normal leading-9 p-10">To find potential members, he tries a new community site.</div>
                <div style={{ opacity: currentStepIndex >= 1 ? 1 : 0, transition: 'opacity 3s ease-in' }} className="max-w-[521px] justify-start text-white text-2xl font-normal leading-9 p-10">He skims the privacy policy in under five minutes and creates his profile.</div>
              </div>
            </div>
            { /* End Scrolly */ }

            { /* Flying images */ }

            <div className="container" style={{ padding: '0 2vw 20vh',  display: 'flex', justifyContent: 'space-between' }}>
              { typeof window !== 'undefined' && window.innerWidth < 640 ?
                <div className="scroller justify-center flex flex-col items-center">
                  <Scrollama offset={0.80} onStepEnter={onStepEnterFlying} onStepProgress={onStepProgressFlying}>
                    <Step data={0} key={0}>
                      <div className="flex flex-col items-center justify-center px-[2rem]" style={{ opacity: progress }}>
                        <img className="max-w-[100%] h-[fit-content] mb-[5vh]" src="/scrolly/003-01.png" alt="Illustration of a post about fixing cars in an online forum called “Muscle Car Fanatics”." />
                        <div className="text-center justify-start text-white text-2xl sm:text-3xl font-normal leading-9 sm:leading-[48px] mb-[5vh]" style={{ gridArea: '2 / 2 / 3 / 3', alignItems: 'center' }}>Joining a social media platform seemed simple: share basic facts and connect with people who share your interests. In Bob’s case, sci-fi fans who love Octavia Butler’s <em>Parable of the Sower</em> and Frank Herbert’s <em>Dune</em>.</div>
                        <img className="max-w-[100%] h-[fit-content] mb-[5vh]" src="/scrolly/003-04.png" alt="Illustration of a post about fantasy fanfiction in an online forum called “Wizard School”." />
                      </div>
                    </Step>
                    <Step data={1} key={1}>
                      <div>
                        &nbsp;
                      </div>
                    </Step>
                  </Scrollama>
                </div>
                :
                <div className="scroller">
                  <Scrollama offset={0.80} onStepEnter={onStepEnterFlying} onStepProgress={onStepProgressFlying}>
                    <Step data={0} key={0}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100vh',
                        flexDirection: 'column',
                        }}>
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 2fr 1fr',
                            gridTemplateRows: 'repeat(3, 1fr)',
                          }}
                          className="max-w-[100%] text-center justify-start text-white text-3xl font-normal leading-[48px]">
                          <div style={{ gridArea: '1 / 1 / 2 / 2', display: 'flex', alignItems: 'center', opacity: piecewiseInterp(progress) }}>
                            <img src="/scrolly/003-01.png" alt="Illustration of a post about fixing cars in an online forum called “Muscle Car Fanatics”."/>
                          </div>
                          <div style={{ gridArea: '1 / 3 / 2 / 4', display: 'flex', alignItems: 'center', opacity: piecewiseInterp(progress)  }}>
                            <img src="/scrolly/003-02.png" alt="Illustration of a post about LGBTQ+ support in an online forum called “Safe Haven”."/>
                          </div>
                          <div className="text-center justify-start text-white text-3xl font-normal leading-[48px]" style={{ gridArea: '2 / 2 / 3 / 3', alignItems: 'center' }}>Joining a social media platform seemed simple: share basic facts and connect with people who share your interests. In Bob’s case, sci-fi fans who love Octavia Butler’s <em>Parable of the Sower</em> and Frank Herbert’s <em>Dune</em>.</div>
                          <div style={{ gridArea: '3 / 1 / 4 / 2', display: 'flex', alignItems: 'center', opacity: piecewiseInterp(progress)  }}>
                            <img src="/scrolly/003-03.png" alt="Illustration of a post about an auction for rare books in an online forum called “Rare Book Society”." />
                          </div>
                          <div style={{ gridArea: '3 / 3 / 4 / 4', display: 'flex', alignItems: 'center', opacity: piecewiseInterp(progress)  }}>
                            <img src="/scrolly/003-04.png" alt="Illustration of a post about fantasy fanfiction in an online forum called “Wizard School”." />
                          </div>
                        </div>
                      </div>
                    </Step>
                  </Scrollama>
                </div>
              }
            </div>
            { /* End Flying images */ }


            { /* Terms and Conditions */ }

            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', maxWidth: '100vw' }}>
              <div className="scroller">
                <Scrollama threshold={2} offset={0.70} onStepEnter={onStepEnterSignature} onStepProgress={onStepProgressSignature} onStepExit={onStepExitSignature}>
                  <Step data={0} key={0}>
                    <div>&nbsp;</div>
                  </Step>
                  <Step data={1} key={1}>
                    <div className="pt-[5rem] pb-[5rem] w-full h-full flex flex-col items-center bg-gradient-to-b from-black/0 to-black">
                      <img className="target opacity-0" style={{ opacity: calculateOpacity(1) }} src="/scrolly/006.png" alt="Illustration of a smartphone camera view showing three individuals among a crowd, each looking at their own smartphone." />
                    </div>
                  </Step>
                  <Step data={2} key={2}>
                    <div className="bg-black py-[20vh] w-full h-full flex flex-col items-center justify-center">
                      <div className="mt-[3rem] max-w-[763px] text-center justify-start text-white text-3xl font-normal leading-[48px]"><p className="p-5">By the time his daughter Maya grew up, the internet his generation had built was unrecognizable.</p></div>
                    </div>
                  </Step>
                </Scrollama>
              </div>
            </div>

            { /* End Terms and Conditions */ }

            { /* 24 Years Later */ }
            <div className="container flex flex-col items-center justify-center bg-black" style={{ justifyContent: 'space-between', maxWidth: '100vw' }}>
              { typeof window !== 'undefined' && window.innerWidth < 640 ?
                <div className="scroller justify-center flex flex-col items-center">
                  <div className="w-96 text-center justify-start text-white text-4xl font-black font-['Gotham'] leading-[55px]">24 years later</div>
                  <div className="justify-center flex flex-row items-center mt-[2rem]">
                    <img className="w-[25%] rotate-[-10deg] max-w-[25%]" src="/scrolly/007-01.png" alt="Illustrated social media photo of a young woman posing with a peace sign." />
                    <img className="w-[25%] origin-top-left z-50 translate-8 rotate-[25deg] max-w-[25%]" src="/scrolly/007-03.png" alt="Illustrated social media photo of a young woman with her dog." />
                    <img className="w-[25%] rotate-[20deg] max-w-[25%]" src="/scrolly/007-02.png" alt="Illustrated social media photo of a young woman at the beach." />
                  </div>
                  <div className="mt-[3rem] max-w-[763px] text-center justify-start text-white text-xl font-normal leading-8 flex justify-center flex-col"><p className="p-5">Maya has been posting photos across platforms every week since she was 16. Like most people, she never read the terms before signing up. Nobody told her she needed to. According to <a className="underline underline-offset-5" href="https://www.pewresearch.org/internet/2023/10/18/how-americans-view-data-privacy/">a 2023 Pew Research Center study</a>, she’s among the 56% of Americans who click “Accept” without reading the privacy policies.</p></div>
                  <img className="max-w-[50%] pr-12" src="/scrolly/009-bubble-1.png" alt="Illustration of a text message bubble that reads “OMG! Jake said he saw your pics!”." />
                  <img className="max-w-[50%] pl-12" src="/scrolly/009-bubble-2.png" alt="Illustration of a text message bubble that reads: “What pics? I’ve never sent Jake anything…”" />
                  <div className="mt-[3rem] max-w-[763px] text-center justify-start text-white text-xl font-normal leading-8"><p className="p-5">In 2026, Maya is 19 when she discovers that deepfakes of her face used on someone else's nude body are spreading online. She isn’t alone. In <a className="underline underline-offset-5" href="https://www.ourcommunia.com/post/the-2025-state-of-women-and-social-media">a 2025 survey by women-centered app Communia</a>, nearly 1 in 5 Gen Z women reported having AI-generated intimate images made of them without consent.</p></div>
                </div>
                :
                <div className="scroller justify-center flex flex-col items-center">
                  <Scrollama threshold={2} offset={0.3} onStepEnter={onStepEnterPhotos} onStepProgress={onStepProgressPhotos} onStepExit={onStepExitPhotos}>
                    <Step data={0} key={0}>
                      <div className="w-96 text-center justify-start text-white text-4xl font-black font-['Gotham'] leading-[55px]">24 years later</div>
                    </Step>
                    <Step data={1} key={1}>
                      <div className="w-full flex flex-row h-[850px]">
                        <div className="flex flex-col w-[25%] items-center">
                          <Parallax translateY={[-90, 90]}>
                            <img style={{ opacity: calculateOpacityPhotos(1) }} className="w-[100%] h-[fit-content] rotate-[-10deg] max-w-[300px]" src="/scrolly/007-01.png" alt="Illustrated social media photo of a young woman posing with a peace sign." />
                          </Parallax>
                          <Parallax translateY={[0, -20]} translateX={[150,-60]}>
                            <img style={{ opacity: calculateOpacityPhotos(1) }} className="w-[100%] h-[fit-content] origin-top-left rotate-[-30deg] mt-[auto] max-w-[300px] mb-[5vh]" src="/scrolly/007-03.png" alt="Illustrated social media photo of a young woman with her dog." />
                          </Parallax>
                        </div>
                        <div className="mt-[3rem] w-[763px] text-center justify-start text-white text-3xl font-normal leading-[48px] flex justify-center flex-col" style={{ zIndex: '400', backgroundColor: 'rgba(0,0,0,0.85)', boxShadow: '5px 5px 24px 26px rgba(00,0,0,0.85)' }}><p className="p-5">Maya has been posting photos across platforms every week since she was 16. Like most people, she never read the terms before signing up. Nobody told her she needed to. According to <a className="underline underline-offset-5" href="https://www.pewresearch.org/internet/2023/10/18/how-americans-view-data-privacy/">a 2023 Pew Research Center study</a>, she’s among the 56% of Americans who click “Accept” without reading the privacy policies.</p></div>
                        <div className="flex flex-col w-[25%] items-center justify-center">
                          <Parallax speed={20}>
                            <img style={{ opacity: calculateOpacityPhotos(1) }} className="w-[100%] h-[fit-content] rotate-[20deg] max-w-[300px]" src="/scrolly/007-02.png" alt="Illustrated social media photo of a young woman at the beach." />
                          </Parallax>
                        </div>
                      </div>
                    </Step>
              <Step data={2} key={2}>
                <div className="mt-[3rem] w-[763px] text-center justify-start text-white text-3xl font-normal leading-[48px]"><p className="p-5">In 2026, Maya is 19 when she discovers that deepfakes of her face used on someone else's nude body are spreading online. She isn’t alone. In <a className="underline underline-offset-5" href="https://www.ourcommunia.com/post/the-2025-state-of-women-and-social-media">a 2025 survey by women-centered app Communia</a>, nearly 1 in 5 Gen Z women reported having AI-generated intimate images made of them without consent.</p></div>
              </Step>
                  </Scrollama>
                </div>
              }
              { typeof window !== 'undefined' && window.innerWidth >= 640 &&
                <div className="scroller">
                  <Scrollama offset={0.80} onStepEnter={onStepEnter} onStepProgress={onStepProgressFlying}>
                    <Step data={0} key={0}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '800px',
                        flexDirection: 'column',
                        }}>
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gridTemplateRows: '1fr 1fr',
                          }}
                          className="max-w-[100%] text-center justify-start text-white text-3xl font-normal leading-[48px]">
                          <div style={{ gridArea: '1 / 1 / 2 / 2', display: 'flex', alignItems: 'center', opacity: piecewiseInterp(progress) }}>
                            <img className="max-w-[400px]" src="/scrolly/009-bubble-1.png" alt="Illustration of a text message bubble that reads “OMG! Jake said he saw your pics!”." />
                          </div>
                          <div style={{ gridArea: '2 / 2 / 3 / 3', display: 'flex', alignItems: 'center', opacity: piecewiseInterp(progress)  }}>
                            <img className="max-w-[400px]" src="/scrolly/009-bubble-2.png" alt="Illustration of a text message bubble that reads: “What pics? I’ve never sent Jake anything…”" />
                          </div>
                        </div>
                      </div>
                    </Step>
                  </Scrollama>
                </div>
              }
            </div>
            { /* End 24 Years Later */ }


            { /* Maya */ }
            <div className="container flex flex-col items-center justify-center bg-black" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', maxWidth: '100vw' }}>
              <div className="scroller">
                <Scrollama threshold={2} offset={0.75} onStepEnter={onStepEnterMaya} onStepProgress={onStepProgressMaya} onStepExit={onStepExitMaya}>
                  <Step data={0} key={0}>
                    <div className="pt-[5rem] pb-[5rem] w-full flex flex-col items-center">
                      <img className="target opacity-0 max-w-[60%] sm:max-w-[600px]" style={{ opacity: calculateOpacityMaya(0) }} src="/scrolly/010-maya-1.png" alt="Illustration of a young woman crying." />
                    </div>
                  </Step>
                  <Step data={1} key={1}>
                    <div>
                      <div className="target opacity-0 mt-[3rem] max-w-[763px]  text-center justify-start text-white text-3xl font-normal leading-[48px]" style={{ opacity: calculateOpacityMaya(1) }} ><p className="p-5">When Maya tries to report the images, she finds that every platform’s process is different.</p></div>
                    </div>
                  </Step>
                  <Step data={2} key={2}>
                    <div className="pt-[5rem] pb-[5rem] w-full flex flex-col items-center">
                      <img className="target opacity-0 max-w-[60%] sm:max-w-[600px]" style={{ opacity: calculateOpacityMaya(2) }} src="/scrolly/010-maya-2.png" alt="Illustration of a young woman covering her face." />
                    </div>
                  </Step>
                  <Step data={3} key={3}>
                    <div>
                      <div className="target opacity-0 mt-[3rem] max-w-[763px]  text-center justify-start text-white text-3xl font-normal leading-[48px]" style={{ opacity: calculateOpacityMaya(3) }} ><p className="p-5">What happens next, and how long this nightmare lasts, is entirely in their hands.</p></div>
                    </div>
                  </Step>
                  <Step data={4} key={4}>
                    <div className="pt-[5rem] pb-[5rem] w-full flex flex-col items-center">
                      <img className="target opacity-0 max-w-[60%] sm:max-w-[600px]" style={{ opacity: calculateOpacityMaya(4) }} src="/scrolly/010-maya-3.png" alt="Illustration of a young woman lying face down in distress." />
                    </div>
                  </Step>
                  <Step data={5} key={5}>
                    <div>
                      <div className="target opacity-0 mt-[3rem] max-w-[763px]  text-center justify-start text-white text-3xl font-normal leading-[48px]" style={{ opacity: calculateOpacityMaya(5) }} ><p className="p-5">The maze of platform policies Maya faces didn’t emerge by accident.</p></div>
                    </div>
                  </Step>
                  <Step data={6} key={6}>
                    <div>
                      <div className="target opacity-0 mt-[5rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-lg font-normal leading-7" style={{ opacity: calculateOpacityMaya(6) }}><span className="text-white text-lg sm:text-2xl font-normal font-['Source_Sans_3'] leading-7 sm:leading-9">Platforms determined that what you click, search, and message could predict what you would pay attention to. The Electronic Privacy Information Center explains that this data can include your <a className="underline underline-offset-5" href="https://epic.org/issues/consumer-privacy/social-media-privacy/">location, health conditions, religious faith, income, relationship status, and what you do on other websites</a>. All of it can be collected and shared with companies you’ve never heard of, depending on the privacy policy you agreed to, according to <a className="underline underline-offset-5" href="https://doi.org/10.1145/3590152">a University of Basel researcher's study</a> on the content of privacy policies from 1996 to 2021. Since platforms often don’t disclose all the ways they track you and the names of their business partners, the policy you agreed to may not tell the whole story of how your data is used and by whom.<br/><br/></span></div>
                    </div>
                  </Step>
                  <Step data={7} key={7}>
                    <div className="pt-[5rem] pb-[5rem] w-full flex flex-col items-center">
                      <img className="target opacity-0 max-w-[60%]" style={{ opacity: calculateOpacityMaya(7) }} src="/scrolly/011-chart.png" alt="Graph showing a line trending steeply upward, indicating growth in data collection over time." />
                    </div>
                  </Step>
                  <Step data={8} key={8}>
                    <div>
                      <div className="target opacity-0 mt-[5rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-lg font-normal leading-7" style={{ opacity: calculateOpacityMaya(8) }}><span className="text-white text-lg sm:text-2xl font-normal font-['Source_Sans_3'] leading-7 sm:leading-9">An <a className="underline underline-offset-5" href="https://analytics.transparency.berkmancenter.org/#overview">analysis of privacy policies by BU Spark!</a>, in collaboration with the Applied Social Media Lab, found that policy complexity has increased significantly over time, with spikes following new regulations like the <a className="underline underline-offset-5" href="https://gdpr-info.eu/">GDPR</a>, <a className="underline underline-offset-5" href="https://oag.ca.gov/privacy/ccpa">CCPA</a>, and <a className="underline underline-offset-5" href="https://digital-strategy.ec.europa.eu/en/policies/digital-services-act">DSA</a>.</span></div>
                    </div>
                  </Step>
                  <Step data={9} key={9}>
                    <div className="pt-[5rem] pb-[5rem] w-full flex flex-col items-center">
                      <img className="target opacity-0 max-w-[60%]" style={{ opacity: calculateOpacityMaya(9) }} src="/scrolly/011-money.png" alt="Illustration of four currency bills falling through the air." />
                    </div>
                  </Step>
                </Scrollama>
              </div>
            </div>
            { /* End Maya */ }

            { /* Begin Charts */ }
            <div className="container flex flex-col items-center justify-center bg-black" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', maxWidth: '100vw' }}>
              <div className="scroller">
                <Scrollama threshold={2} offset={0.75} onStepEnter={onStepEnterCharts} onStepProgress={onStepProgressCharts} onStepExit={onStepExitCharts}>
                  <Step data={0} key={0}>
                    <div>
                      <div className="target opacity-0 mt-[5rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-lg font-normal leading-7" style={{ opacity: calculateOpacityCharts(0)}}><span className="text-white text-lg sm:text-2xl font-normal font-['Source_Sans_3'] leading-7 sm:leading-9">Today, platform policies are</span></div>
                    </div>
                  </Step>
                  <Step data={1} key={1}>
                    <div>
                      <div className="target opacity-0 mt-[3rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-3xl sm:text-5xl font-normal leading-10 sm:leading-[62px]" style={{ opacity: calculateOpacityCharts(1) }}>Dense</div>
                    </div>
                  </Step>
                  <Step data={2} key={2}>
                    <div>
                      <div className="target opacity-0 mt-[3rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-lg font-normal leading-7" style={{ opacity: calculateOpacityCharts(2)}}><span className="text-white text-lg sm:text-2xl font-normal font-['Source_Sans_3'] leading-7 sm:leading-9">A <a className="underline underline-offset-5" href="https://oar.princeton.edu/bitstream/88435/pr1w562/1/PrivacyPolicies.pdf">study of over a million policies by Princeton researchers</a> reported that the average privacy policy has doubled in length over 20 years.</span></div>
                    </div>
                  </Step>
                  <Step data={3} key={3}>
                    <div className="sm:h-[100vh] container flex flex-col items-center justify-center bg-black h-[30vh] mt-[3rem]" style={{ justifyContent: 'space-between', maxWidth: '100vw', opacity: calculateOpacityCharts(3) }}>
                      <img className="absolute w-[90vw] max-w-[800px]" src="/scrolly/012-chart-01a.svg" alt="Line graph by BU Spark! showing Average Policy Length Over Time between 2005-2025, with Average Word Count fluctuating for companies including Facebook/Meta, Reddit, Instagram, LinkedIn, Telegram, YouTube, Twitter/X, Pinterest, Snapchat, Discord, and TikTok." />
                      <img className="absolute w-[85vw] sm:w-[760px] max-w-[800px]" src="/scrolly/012-chart-01b.svg" alt="Legend for the chart." />
                    </div>
                  </Step>
                  <Step data={4} key={4}>
                    <div>
                      <div className="target opacity-0 mt-[3rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-3xl sm:text-5xl font-normal leading-10 sm:leading-[62px]" style={{ opacity: calculateOpacityCharts(4) }}>Hard to read</div>
                    </div>
                  </Step>
                  <Step data={5} key={5}>
                    <div>
                      <div className="target opacity-0 mt-[3rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-lg font-normal leading-7" style={{ opacity: calculateOpacityCharts(5)}}><span className="text-white text-lg sm:text-2xl font-normal font-['Source_Sans_3'] leading-7 sm:leading-9">Many popular social media platforms' privacy policies require a <a className="underline underline-offset-5" href="https://dl.acm.org/doi/full/10.1145/3590152">college-level reading ability</a> to understand.</span></div>
                    </div>
                  </Step>
                  <Step data={6} key={6}>
                    <div className="sm:h-[100vh] container flex flex-col items-center justify-center bg-black h-[30vh] mt-[3rem]" style={{ justifyContent: 'space-between', maxWidth: '100vw', opacity: calculateOpacityCharts(6) }}>
                      <img className="absolute w-[90vw] max-w-[800px]" src="/scrolly/012-chart-02a.svg" alt="Line graph by BU Spark! showing Privacy Policy Complexity Over Time between 2005-2025, with Grade Level Required fluctuating for companies including Facebook/Meta, Reddit, Instagram, LinkedIn, Telegram, YouTube, Twitter/X, Pinterest, Snapchat, Discord, and TikTok." />
                      <img className="absolute w-[85vw] sm:w-[760px] max-w-[800px]" src="/scrolly/012-chart-02b.svg" alt="Legend for the chart." />
                    </div>
                  </Step>
                  <Step data={7} key={7}>
                    <div>
                      <div className="target opacity-0 mt-[3rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-3xl sm:text-5xl font-normal leading-10 sm:leading-[62px]" style={{ opacity: calculateOpacityCharts(7) }}>Fragmented</div>
                    </div>
                  </Step>
                  <Step data={8} key={8}>
                    <div>
                      <div className="target opacity-0 mt-[3rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-lg font-normal leading-7" style={{ opacity: calculateOpacityCharts(8)}}><span className="text-white text-lg sm:text-2xl font-normal font-['Source_Sans_3'] leading-7 sm:leading-9">Privacy policies, terms of service, community guidelines, transparency reports, and other policy documents live in scattered links, with <a className="underline underline-offset-5" href="https://oar.princeton.edu/bitstream/88435/pr1w562/1/PrivacyPolicies.pdf">no shared standards</a> across the industry.</span></div>
                    </div>
                  </Step>
                  <Step data={9} key={9}>
                    <div className="sm:min-h-[900px] container flex flex-col items-center justify-center bg-black h-[60vh] mt-[5rem]" style={{ justifyContent: 'space-between', maxWidth: '100vw', opacity: calculateOpacityCharts(9) }}>
                      <img className="absolute w-[90vw] max-w-[800px]" src="/scrolly/012-chart-03a.svg" alt="Stacked bar chart by BU Spark! showing Doc Type Mix by Cohort for pre-2010 Old School platforms and post-2010 New School platforms, each with a mixed percentage of guideline, privacy, and terms of service documents." />
                      <img className="absolute w-[85vw] sm:w-[760px] max-w-[800px]" src="/scrolly/012-chart-03b.svg" alt="Legend for the chart." />
                    </div>
                  </Step>
                  <Step data={10} key={10}>
                    <div>
                      <div className="target opacity-0 sm:mt-[6rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-lg font-normal leading-7" style={{ opacity: calculateOpacityCharts(10)}}><span className="text-white text-lg sm:text-2xl font-normal font-['Source_Sans_3'] leading-7 sm:leading-9">When policies change, old versions often disappear. A <a href="https://petsymposium.org/popets/2023/popets-2023-0111.pdf" className="underline underline-offset-5">survey of privacy researchers</a> showed that the lack of access to historical policy documents is one of the biggest obstacles to understanding changes in platform governance.</span></div>
                    </div>
                  </Step>
                </Scrollama>
              </div>
            </div>
            { /* End Charts */ }

            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', maxWidth: '100vw' }}>
              <div className="scroller">
                <Scrollama offset={0.80} onStepProgress={onStepProgressEyes}>
                  <Step data={0} key={0}>
                    <div className="w-full bg-[#33224E]">
                      <div className="w-full h-[30vh] justify-center flex flex-col items-center bg-gradient-to-b from-black to-black/0 sm:py-[40vh]">
                        <div className="max-w-[763px] text-center justify-start text-white text-3xl font-normal leading-[48px]" style={{ opacity: progressEyes }}><p className="p-5">What if platforms were being watched the way they watch us?</p></div>
                        <img className="absolute target opacity-20" style={{ opacity: progressEyes/5 }} src="/scrolly/013-eyes.png" />
                      </div>
                    </div>
                  </Step>
                </Scrollama>
              </div>
              <div className="bg-[#33224E] bg-[url('/scrolly/hero-bg.svg')] bg-size-[200%] sm:bg-size-[100%] py-[20vh] w-full h-[100vh] flex flex-col items-center justify-center">
                <div className="mt-[3rem] max-w-[763px] text-center justify-start text-white text-3xl font-normal leading-[48px]"><p className="p-5">Four days in, Maya is still reporting images. A close friend who studies digital rights sends her a link to a new website called <a className="underline underline-offset-5" href="https://hub.transparency.berkmancenter.org/">Transparency Hub</a>.</p></div>
              </div>
              <div className="bg-[#33224E] bg-size-[200%] pt-[20vh] w-full h-full flex flex-col items-center justify-center">
                <img className="w-full max-w-[668px]" src="/THUB_title.svg" alt="Transparency Hub logo." />
                <div className="target mt-[3rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-lg font-normal leading-7"><p className="text-white text-lg sm:text-2xl font-normal font-['Source_Sans_3'] leading-7 sm:leading-9">Built by the Applied Social Media Lab at Harvard’s <a href="https://cyber.harvard.edu" className="underline underline-offset-5">Berkman Klein Center for Internet & Society</a>, Transparency Hub automatically tracks and archives policy documents from over 300 social and technology companies.</p><p className="mt-[2rem] text-white text-lg sm:text-2xl font-normal font-['Source_Sans_3'] leading-7 sm:leading-9">When a platform updates its policies, Transparency Hub captures the change, saves the previous version, and makes all versions searchable.</p></div>
                <div className="scroller">
                  <Scrollama offset={0.80} onStepProgress={onStepProgressScreen}>
                    <Step data={0} key={0}>
                      <img className="mt-[2rem] w-[80vw] w-[80%] max-w-[668px]" src="/scrolly/014-screen.png" alt="Screenshot of the Transparency Hub user interface, including a list of platforms documented in the Policy Index." style={{ opacity: progressScreen }}/>
                    </Step>
                  </Scrollama>
                </div>
                <div className="mt-[3rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-3xl sm:text-4xl font-normal"><p className="p-5">Transparency Hub turns the sprawling infrastructure of platform policies into a living archive of structured public knowledge that people can actually use.</p></div>
                <div className="target mt-[3rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-lg font-normal leading-7"><p className="text-white text-lg sm:text-2xl font-normal font-['Source_Sans_3'] leading-7 sm:leading-9">If you’re a researcher, you can examine a vast dataset of platform policies over time. ASML researchers used Transparency Hub data to build <a className="underline underline-offset-5" href="https://asmlfall-mz2cdmhtrcg9p5tzr8irmh.streamlit.app/">Platform Policy Explorer</a>, a dashboard that compares how much power companies keep for themselves versus the rights they give to users across different platforms, time periods, and regulatory events.</p><p className="mt-[2rem] text-white text-lg sm:text-2xl font-normal font-['Source_Sans_3'] leading-7 sm:leading-9">As a platform user, you can use the Hub to identify the policies that apply to you and hold platforms you use every day to their own stated rules.</p></div>
                <div className="scroller w-full">
                  <Scrollama threshold={2} offset={0.75} onStepEnter={onStepEnterEnding} onStepProgress={onStepProgressEnding} onStepExit={onStepExitEnding}>
                    <Step data={0} key={0}>
                      <div className="target opacity-0 justify-center flex flex-col items-center mt-[2rem]" style={{ opacity: calculateOpacityEnding(0) }}>
                        <img className="mt-[2rem] w-[66%] max-w-[668px]" src="/scrolly/015-03.png" alt="Illustration of two people, Bob and Maya, smiling and holding a banner that reads “DATA RIGHTS” in letters." />
                        <div className="mt-[3rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-lg font-normal leading-7"><p className="text-white text-lg sm:text-2xl font-normal font-['Source_Sans_3'] leading-7 sm:leading-9">Maya uses Transparency Hub to find what protections she is entitled to. She learns that the <a className="underline underline-offset-5" href="https://www.congress.gov/bill/119th-congress/senate-bill/146/text">TAKE IT DOWN Act</a> requires platforms to remove non-consensual intimate imagery within 48 hours after receiving a report. It has been 96 hours. Armed with evidence that platforms have violated their commitments to users, she files appeals.</p></div>
                      </div>
                    </Step>
                    <Step data={1} key={1}>
                      <div className="target opacity-0 justify-center flex flex-col items-center mt-[2rem]" style={{ opacity: calculateOpacityEnding(1) }}>
                        <img className="mt-[2rem] w-[66%] max-w-[668px]" src="/scrolly/015-04.png" alt="Illustration of Bob seated and holding a book, gesturing enthusiastically as he speaks to other book club members." />
                        <div className="mt-[3rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-lg font-normal leading-7"><p className="text-white text-lg sm:text-2xl font-normal font-['Source_Sans_3'] leading-7 sm:leading-9">Bob has grown increasingly wary of how social media platforms handle privacy, especially after Maya’s experience. He learns that the platform he joined simply to read science fiction with others now collects far more data than he first agreed to share. It has also experienced security breaches exposing users’ location data, payment information, and event histories.</p><p className="text-white text-lg sm:text-2xl font-normal font-['Source_Sans_3'] leading-7 sm:leading-9 mt-[3rem]">He was never directly affected by these incidents. But now Bob is asking more questions about his place in the sci-fi story that platforms seem to be writing around users like him.</p></div>
                      </div>
                    </Step>
                    <Step data={2} key={2}>
                      <div className="target opacity-0 justify-center flex flex-col items-center mt-[2rem]" style={{ opacity: calculateOpacityEnding(2) }}>
                        <div className="mt-[5rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-2xl sm:text-5xl font-normal leading-8 sm:leading-[60px]" style={{ opacity: calculateOpacityEnding(0) }}><p>Platform users deserve to know the policies governing their digital lives: what they agreed to, what changed, and how to hold companies accountable.</p></div>
                      </div>
                    </Step>
                    <Step data={3} key={3}>
                      <div className="target opacity-0 justify-center flex flex-row items-center mt-[2rem]" style={{ opacity: calculateOpacityEnding(3) }}>
                        <img className="mt-[2rem] w-[33%] max-w-[668px]" src="/scrolly/015-01.png" alt="Illustration of a social media policy document going through a scanner." />
                        <img className="mt-[2rem] w-[33%] max-w-[668px]" src="/scrolly/015-02.png" alt="Illustration of a zine that reads “How to make your phone permissions spark joy or how to protect your phone from invasive default permissions.”" />
                      </div>
                    </Step>
                    <Step data={4} key={4}>
                      <div className="target opacity-0 justify-center flex flex-col items-center mt-[2rem]" style={{ opacity: calculateOpacityEnding(4) }}>
                        <div className="w-full bg-[#33224E]">
                          <div className="w-full h-full justify-center flex flex-col items-center bg-gradient-to-b from-black/0 to-black">
                              <div className="mt-[5rem] max-w-[763px] mx-[2rem] text-center justify-start text-white text-2xl sm:text-4xl font-normal leading-11">Transparency Hub helps people like Bob and Maya more easily understand how tech companies handle (and mishandle) their data.</div>
                            <div className="mt-[5rem] max-w-[763px] mx-[2rem] text-center items-center justify-start text-white text-2xl sm:text-4xl font-bold leading-11 flex gap-4 flex-row"><a href="https://hub.transparency.berkmancenter.org/policy_index" className="underline underline-offset-5">Search Transparency Hub’s<br />Policy Index</a><a href="https://hub.transparency.berkmancenter.org/policy_index" className="underline underline-offset-5"><img className="h-[1.5rem] sm:h-[2rem]" src="/scrolly/arrow-right-logomark.png"/></a></div>
                            <div className="mx-[2rem] mt-[5rem] max-w-[863px] text-white text-xl sm:text-2xl font-normal font-['Source_Sans_3'] leading-9">
                              <div className="w-full mb-[3rem] max-w-[863px] h-1 bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red " />
                              <p>Written by <a href="https://asml.cyber.harvard.edu/?author_name=alice-jo" className="underline underline-offset-5">Alice Jo</a>,<br />Design and illustration by <a href="https://asml.cyber.harvard.edu/?author_name=zach-deocadiz" className="underline underline-offset-5">Zach Deocadiz</a>,<br />Web development by <a href="https://asml.cyber.harvard.edu/?author_name=darius-kazemi" className="underline underline-offset-5">Darius Kazemi</a>,<br />Additional research by<br /><a href="https://www.linkedin.com/in/yongil-bae/" className="underline underline-offset-5">Yongil Bae</a>, <a href="https://www.linkedin.com/in/grace-harlan-12431a185/" className="underline underline-offset-5">Grace Harlan</a>, and the<br /><a href="https://asml.cyber.harvard.edu/2026/03/02/inside-policy-analytics-dashboard/" className="underline underline-offset-5">BU Spark! team</a></p>
                              <p className="mt-[2rem]">With contributions from<br /><a href="https://asml.cyber.harvard.edu/?author_name=meg-marco" className="underline underline-offset-5">Meg Marco</a>, <a href="https://asml.cyber.harvard.edu/?author_name=matt-marino" className="underline underline-offset-5">Matt Marino</a>, <a href="https://asml.cyber.harvard.edu/?author_name=kalie-mayberry" className="underline underline-offset-5">Kalie Mayberry</a>,<br /><a href="https://asml.cyber.harvard.edu/?author_name=shelby-el-otmani" className="underline underline-offset-5">Shelby El Otmani</a>, and <a href="https://cyber.harvard.edu/people/isabella-roden" className="underline underline-offset-5">Isabella Roden</a></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Step>
                  </Scrollama>
                </div>
              </div>
            </div>
            <div className="bg-black w-full flex items-center justify-center">
              <img className="bg-black pt-[3rem] w-full max-w-[668px]" src="/THUB_title.svg" alt="Transparency Hub logo." />
            </div>
          </div>
        </div>
      </ParallaxProvider>
    </div>
  )
}

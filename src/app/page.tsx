"use client"

import Image from "next/image"
import { StyledButton1, StyledButton2 } from "@/components/button"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import anime from "animejs/lib/anime.es.js"
import CssTextField from "@/components/TextField"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"

import { connectNexus } from "@/utils/connectContract"
import { useRouter, useParams } from "next/navigation"
import { AssetTable } from "@/components/Assets"

import loadingStyles from "../styles/loading.module.css"

export default function Home() {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount()

  const elementsRef = useRef<Array<HTMLElement | null>>([])
  const elementsWalletRef = useRef<Array<HTMLElement | null>>([])
  const elementsWalletRef2 = useRef<Array<HTMLElement | null>>([])

  console.log("Admin address ", address)

  useEffect(() => {
    if (
      elementsWalletRef.current &&
      elementsWalletRef.current.length > 0 &&
      elementsWalletRef
    ) {
      const targets = elementsWalletRef.current.filter(element => element)
      anime.timeline({ loop: false }).add({
        targets: targets,
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(250, { easing: "easeOutSine" }),
      })
    }
  }, [isConnected])

  useEffect(() => {
    if (
      elementsWalletRef2.current &&
      elementsWalletRef2.current.length > 0 &&
      elementsWalletRef2
    ) {
      const targets = elementsWalletRef2.current.filter(element => element)
      anime.timeline({ loop: false }).add({
        targets: targets,
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(250, { easing: "easeOutSine" }),
      })
    }
  }, [isConnected])

  useEffect(() => {
    if (elementsRef.current) {
      const targets = elementsRef.current.filter(element => element)
      anime.timeline({ loop: false }).add({
        targets: targets,
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 1500,
        delay: anime.stagger(250, { easing: "easeOutSine" }),
      })
    }
  }, [])

  return (
    <div className="  flex flex-col   justify-start   min-h-[80vh]  w-[75vw] container m-16">
      {/* display ui when wallet is not connected */}
      {isConnected === false ? (
        <>
          <div className="  flex flex-col w-full items-center justify-center mt-12">
            <h1
              className="text-[2.5rem] font-black  "
              // @ts-ignore
              ref={el => (elementsRef.current[0] = el)}
            >
              Get Started
            </h1>
            <h1
              className="text-lg font-light mt-4 "
              // @ts-ignore
              ref={el => (elementsRef.current[1] = el)}
            >
              connect your wallet to get started{" "}
            </h1>

            <div
              // @ts-ignore
              ref={el => (elementsRef.current[2] = el)}
            >
              <Image
                src={"/Images/MetamaskLogo.svg"}
                width={200}
                height={200}
                alt="metamask logo"
                className="mt-8 mb-8"
              />
            </div>

            <div
              // @ts-ignore
              ref={el => (elementsRef.current[3] = el)}
            >
              <ConnectButton />
            </div>
          </div>
        </>
      ) : (
        <>
          {isConnecting && (
            <>
              <div className=" w-[82vw] flex h-[100vh] flex-col  justify-center items-center">
                <div>
                  {" "}
                  <div className={loadingStyles.loader}>
                    <div className={loadingStyles.loader__bar}></div>
                    <div className={loadingStyles.loader__bar}></div>
                    <div className={loadingStyles.loader__bar}></div>
                    <div className={loadingStyles.loader__bar}></div>
                    <div className={loadingStyles.loader__bar}></div>
                    <div className={loadingStyles.loader__ball}></div>
                  </div>
                </div>

                <div className="text-3xl text-black mt-3">Loading</div>
              </div>
            </>
          )}
          <>
            <div className=" absolute top-5 right-5 ">
              <ConnectButton />
            </div>

            {/* <div className="flex "> */}
            <div className="flex flex-row  justify-around items-center mt-4 ">
              <div className="border-2 w-[20rem] h-full bg-primary text-white text-xl  font-semibold rounded-2xl px-4 py-6 text-wrap text-center">
                <h1>52</h1>
                <h1>Staking Earned Returns</h1>
              </div>
              <div className="border-2 w-[20rem] h-full bg-primary text-white text-xl  font-semibold rounded-2xl px-4 py-6 text-wrap text-center">
                <h1>1000</h1>
                <h1>Total ETH bridged</h1>
              </div>

              <div className="border-2 w-[20rem] h-full bg-primary text-white text-xl  font-semibold rounded-2xl px-4 py-6 text-wrap text-center">
                <h1>52,000</h1>
                <h1>transactions processed</h1>
              </div>
            </div>

            {/* <div className="flex flex-row  justify-around items-center mt-4 ">
                <div className="border-2 w-[20rem] h-full bg-primary text-white text-2xl  font-semibold rounded-2xl p-4 text-wrap text-center">
                  <h1>1000</h1>
                  <h1>Total ETH bridged</h1>
                </div>
              </div>

              <div className="flex flex-row  justify-around items-center mt-4 ">
                <div className="border-2 w-[20rem] h-full bg-primary text-white text-2xl  font-semibold rounded-2xl p-4 text-wrap text-center">
                  <h1>52,000</h1>
                  <h1>No of transactions processed</h1>
                </div>
              </div>
            </div> */}
            <div className="flex flex-col  space-y-4 mt-8">
              <h1 className="text-5xl  text-black font-semibold">
                Bridging Assets
              </h1>

              <h1 className="text-md  text-gray-500 font-medium">
                ETH associated assets in native bridge
              </h1>
            </div>

            <AssetTable />
          </>
        </>
      )}
    </div>
  )
}

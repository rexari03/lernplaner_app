'use client'

import { fetchHelloWorld } from '@/api/hello';
import {fetchAllStudents} from "@/api/studentService";

export default function Home() {
  return (
      <div className={"container mt-4"}>
        <h1 className={"text-center mb-4 display-4 fw-bold"}>HomePage</h1>
        <div className={"card gradient-bg p-3 custom-shadow rounded"}>
          <div className={"card-body text-white"}>
            <div className={"row align-items-center"}>
              <div className={"col-6"}>
                <p className={"fs-6 fs-md-5 fs-lg-4 fs-xl-3 fs-xxl-2"}>Willkommen auf der Homepage! Hier finden Sie
                  verschiedene Informationen und Ressourcen.</p>
                <p className={"fs-6 fs-md-5 fs-lg-4 fs-xl-3 fs-xxl-2"}>Bitte navigieren Sie durch die Menüs, um mehr zu
                  erfahren. </p>
              </div>
              <div className={"col-6 d-flex justify-content-center"}>
                <div className="aspect-ratio aspect-ratio-1x1">
                  <img src="/ai_pic_greyscale.jpg" alt="AI Bild" className="img-fluid rounded-3 shadow"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"mt-4 card gradient-bg p-3 custom-shadow rounded"}>
          <div className={"card-body text-white"}>
            <h2 className={"text-center mb-4 fs-1 fs-md-2 fs-lg-3 fs-xl-4 fs-xxl-5"}>Noch etwas Inhalt</h2>
            <div className={"row align-items-center"}>
              <div className={"col-6 d-flex justify-content-center"}>
                <div className="aspect-ratio aspect-ratio-1x1">
                  <img src="/ai_pic_greyscale_2.jpg" alt="AI Bild" className="img-fluid rounded-3 shadow"/>
                </div>
              </div>
              <div className={"col-6"}>
                <p className={"fs-6 fs-md-5 fs-lg-4 fs-xl-3 fs-xxl-2"}>Lorem ipsum dolor sit amet, consetetur sadipscing
                  elitr, sed diam nonumy eirmod tempor invidunt ut
                  labore
                  et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                  rebum.
                  Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
                  sit
                  amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
                  kasd
                  gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
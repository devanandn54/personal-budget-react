import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import * as d3 from 'd3';

const HomePage = ({ budgetData, chartData }) => {

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (budgetData.length > 0) {
      createChart(budgetData)
      getBudgetUsingD3();
    }
  }, [budgetData]);

  const createChart = (data) => {
    const ctx = chartRef.current.getContext("2d");
    
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    chartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: chartData,
    });
  };


  const getBudgetUsingD3 = () => {
    
    const width = 600;
    const height = 600;
    const radius = Math.min(width, height) / 2;

    d3.select("#chart").selectAll("*").remove(); // Clear previous chart if any

    const svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value(d => d.budget).sort(null);
    const arc = d3.arc().outerRadius(radius * 0.8).innerRadius(radius * 0.4);

    const arcs = svg.selectAll("arc")
      .data(pie(budgetData))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => d.data.color);

    arcs.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(d => d.data.title)
      .style("font-size", "12px")
      .style("fill", "white")
      .style("font-weight", "bold");
  };
  
  return (
    <main className="container center" id="main-content" role="main">
      <section className="page-area">
        <article className="text-box">
          <h2>Stay on track</h2>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article className="text-box">
          <h2>Alerts</h2>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article className="text-box">
          <h2>Results</h2>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article className="text-box">
          <h2>Chart</h2>
          <p>
            <canvas
              id="myChart"
              ref={chartRef}
              width="400"
              height="400"
            ></canvas>
          </p>
        </article>

        <article className="text-box">
          <h2>Stay on track</h2>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article className="text-box">
          <h2>Alerts</h2>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article className="text-box">
          <h2>Results</h2>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article className="text-box">
          <h2>Free</h2>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </article>
      </section>
      <h2>My Budget Chart</h2>
      <svg id="chart" width="600" height="600"></svg>
    </main>
  );
};

export default HomePage;

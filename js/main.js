

d3.csv('Clinical Unit Costs-1.csv')
    .then(data => {
        data.forEach(d => {
            d.enrollment = +d.enrollment;
        });

        showBarChart(data);
    })
    .catch(error => {
        console.error('Error loading the data');
    });

function showBarChart(data) {
    const margin = {top: 15, right: 50, bottom: 20, left: 200};

    const width = 500,
        height = 450;

    const svg = d3.select('#chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.enrollment)])
        .range([0, width]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.campus))
        .range([0, height])

    const xAxis = d3.axisBottom(xScale)
        .ticks(6)
        .tickSizeOuter(0);

    const yAxis = d3.axisLeft(yScale)
        .tickSizeOuter(0);

    const xAxisGroup = svg.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    const yAxisGroup = svg.append('g')
        .attr('class', 'axis y-axis')
        .call(yAxis);

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', d => xScale(d.enrollment))
        .attr('height', 100)
        .attr('fill', d => d.color)
        .attr('y', d => yScale(d.campus))
        .attr('x', 0);
}

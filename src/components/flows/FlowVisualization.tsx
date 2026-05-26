import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { 
  Flow, 
  FlowType, 
  ComponentNode, 
  FlowState,
  FlowVisualizationProps 
} from './types';

// Flow color constants
const FLOW_COLORS = {
  [FlowType.DATA]: '#4169E1', // Blue
  [FlowType.CONTROL]: '#DC143C', // Red
  [FlowType.FEEDBACK]: '#3CB371', // Green
  [FlowType.META_COGNITIVE]: '#9370DB', // Purple
};

// Flow state opacity
const FLOW_STATE_OPACITY = {
  [FlowState.ACTIVE]: 1,
  [FlowState.IDLE]: 0.5,
  [FlowState.BLOCKED]: 0.2,
  [FlowState.OVERLOADED]: 1,
};

// Component to visualize dynamic flows between architecture components
const FlowVisualization: React.FC<FlowVisualizationProps> = ({
  nodes,
  flows,
  width,
  height,
  selectedFlowTypes = Object.values(FlowType),
  selectedComponentIds = [],
  onFlowClick,
  onNodeClick,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Filter flows based on selected types and components
  const filteredFlows = flows.filter(flow => {
    const typeMatch = selectedFlowTypes.includes(flow.type);
    const componentMatch = selectedComponentIds.length === 0 || 
      selectedComponentIds.includes(flow.source) || 
      selectedComponentIds.includes(flow.target);
    return typeMatch && componentMatch;
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    
    // Clear previous content
    svg.selectAll('*').remove();
    
    // Create main group for transformations
    const g = svg.append('g');
    
    // Draw nodes
    const nodeElements = g.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .on('click', (event, d) => onNodeClick && onNodeClick(d));
    
    // Draw node rectangles
    nodeElements.append('rect')
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('fill', 'white')
      .attr('stroke', '#333')
      .attr('stroke-width', 1);
    
    // Add node labels
    nodeElements.append('text')
      .attr('x', d => d.width / 2)
      .attr('y', d => d.height / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .text(d => d.label)
      .attr('font-size', '12px')
      .attr('fill', '#333');
    
    // Create flow paths
    const flowElements = g.selectAll('.flow')
      .data(filteredFlows)
      .enter()
      .append('g')
      .attr('class', 'flow')
      .on('click', (event, d) => onFlowClick && onFlowClick(d));
    
    // Helper function to find node by id
    const findNode = (id: string) => nodes.find(node => node.id === id);
    
    // Helper function to calculate path between nodes
    const calculatePath = (flow: Flow) => {
      const source = findNode(flow.source);
      const target = findNode(flow.target);
      
      if (!source || !target) return '';
      
      // Calculate center points of nodes
      const sourceX = source.x + source.width / 2;
      const sourceY = source.y + source.height / 2;
      const targetX = target.x + target.width / 2;
      const targetY = target.y + target.height / 2;
      
      // Calculate control points for curved paths
      const dx = targetX - sourceX;
      const dy = targetY - sourceY;
      const controlX1 = sourceX + dx * 0.4;
      const controlY1 = sourceY + dy * 0.1;
      const controlX2 = sourceX + dx * 0.6;
      const controlY2 = sourceY + dy * 0.9;
      
      return `M ${sourceX} ${sourceY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${targetX} ${targetY}`;
    };
    
    // Draw flow paths with appropriate styling based on flow type
    flowElements.each(function(flow) {
      const flowGroup = d3.select(this);
      const path = calculatePath(flow);
      
      // Base path
      const basePath = flowGroup.append('path')
        .attr('d', path)
        .attr('fill', 'none')
        .attr('stroke', FLOW_COLORS[flow.type])
        .attr('stroke-width', 2 + flow.bandwidth * 3) // Width based on bandwidth
        .attr('stroke-opacity', FLOW_STATE_OPACITY[flow.state] * flow.reliability)
        .attr('stroke-dasharray', flow.type === FlowType.CONTROL ? '10,5' : 
                                  flow.type === FlowType.FEEDBACK ? '5,5' : 
                                  flow.type === FlowType.META_COGNITIVE ? '15,10,5,10' : 'none');
      
      // Add flow animation based on type
      if (flow.state === FlowState.ACTIVE || flow.state === FlowState.OVERLOADED) {
        // Create animated markers for data flows
        if (flow.type === FlowType.DATA) {
          const animatedMarkers = flowGroup.append('g')
            .attr('class', 'flow-markers');
          
          // Create gradient for data flow
          const gradientId = `data-gradient-${flow.id}`;
          const gradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', gradientId)
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%');
          
          gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', FLOW_COLORS[flow.type])
            .attr('stop-opacity', 0.3);
          
          gradient.append('stop')
            .attr('offset', '50%')
            .attr('stop-color', FLOW_COLORS[flow.type])
            .attr('stop-opacity', 1);
          
          gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', FLOW_COLORS[flow.type])
            .attr('stop-opacity', 0.3);
          
          // Create animated dots
          const numDots = 5;
          for (let i = 0; i < numDots; i++) {
            animatedMarkers.append('circle')
              .attr('r', 3)
              .attr('fill', FLOW_COLORS[flow.type])
              .attr('opacity', 0.8)
              .call(animateAlongPath, basePath.node(), 2000 + i * 400, flow.latency);
          }
        }
        
        // Create animated dashes for control flows
        if (flow.type === FlowType.CONTROL) {
          basePath
            .attr('stroke-dashoffset', 0)
            .transition()
            .duration(2000 / (1 - flow.latency * 0.8))
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 30)
            .on('end', function repeat() {
              d3.select(this)
                .attr('stroke-dashoffset', 0)
                .transition()
                .duration(2000 / (1 - flow.latency * 0.8))
                .ease(d3.easeLinear)
                .attr('stroke-dashoffset', 30)
                .on('end', repeat);
            });
        }
        
        // Create reverse animated dashes for feedback flows
        if (flow.type === FlowType.FEEDBACK) {
          basePath
            .attr('stroke-dashoffset', 0)
            .transition()
            .duration(2000 / (1 - flow.latency * 0.8))
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', -20)
            .on('end', function repeat() {
              d3.select(this)
                .attr('stroke-dashoffset', 0)
                .transition()
                .duration(2000 / (1 - flow.latency * 0.8))
                .ease(d3.easeLinear)
                .attr('stroke-dashoffset', -20)
                .on('end', repeat);
            });
        }
        
        // Create pulse animation for meta-cognitive flows
        if (flow.type === FlowType.META_COGNITIVE) {
          // Create gradient for pulse effect
          const pulseGradientId = `pulse-gradient-${flow.id}`;
          const pulseGradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', pulseGradientId)
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%');
          
          pulseGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', FLOW_COLORS[flow.type])
            .attr('stop-opacity', 0.1);
          
          pulseGradient.append('stop')
            .attr('offset', '50%')
            .attr('stop-color', FLOW_COLORS[flow.type])
            .attr('stop-opacity', 0.8);
          
          pulseGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', FLOW_COLORS[flow.type])
            .attr('stop-opacity', 0.1);
          
          // Apply gradient to path
          basePath.attr('stroke', `url(#${pulseGradientId})`);
          
          // Animate pulse
          const pulseAnimation = () => {
            basePath
              .attr('stroke-width', 2 + flow.bandwidth * 3)
              .transition()
              .duration(1000)
              .attr('stroke-width', 4 + flow.bandwidth * 3)
              .transition()
              .duration(1000)
              .attr('stroke-width', 2 + flow.bandwidth * 3)
              .on('end', pulseAnimation);
          };
          
          pulseAnimation();
        }
        
        // Add warning indicator for overloaded flows
        if (flow.state === FlowState.OVERLOADED) {
          const source = findNode(flow.source);
          const target = findNode(flow.target);
          
          if (source && target) {
            // Calculate midpoint of the path
            const midX = (source.x + source.width / 2 + target.x + target.width / 2) / 2;
            const midY = (source.y + source.height / 2 + target.y + target.height / 2) / 2;
            
            // Add warning indicator
            flowGroup.append('circle')
              .attr('cx', midX)
              .attr('cy', midY)
              .attr('r', 8)
              .attr('fill', 'yellow')
              .attr('stroke', 'red')
              .attr('stroke-width', 2);
            
            flowGroup.append('text')
              .attr('x', midX)
              .attr('y', midY)
              .attr('text-anchor', 'middle')
              .attr('dominant-baseline', 'middle')
              .text('!')
              .attr('font-size', '12px')
              .attr('font-weight', 'bold')
              .attr('fill', 'red');
          }
        }
      }
      
      // Add flow labels
      if (flow.label) {
        const source = findNode(flow.source);
        const target = findNode(flow.target);
        
        if (source && target) {
          // Calculate midpoint of the path
          const midX = (source.x + source.width / 2 + target.x + target.width / 2) / 2;
          const midY = (source.y + source.height / 2 + target.y + target.height / 2) / 2;
          
          // Add label background
          flowGroup.append('rect')
            .attr('x', midX - 40)
            .attr('y', midY - 10)
            .attr('width', 80)
            .attr('height', 20)
            .attr('rx', 5)
            .attr('ry', 5)
            .attr('fill', 'white')
            .attr('stroke', FLOW_COLORS[flow.type])
            .attr('stroke-width', 1)
            .attr('opacity', 0.8);
          
          // Add label text
          flowGroup.append('text')
            .attr('x', midX)
            .attr('y', midY)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .text(flow.label)
            .attr('font-size', '10px')
            .attr('fill', '#333');
        }
      }
    });
    
    // Helper function to animate elements along a path
    function animateAlongPath(element: d3.Selection<any, any, any, any>, path: SVGPathElement | null, duration: number, latency: number) {
      if (!path) return;
      
      const actualDuration = duration / (1 - latency * 0.8); // Adjust duration based on latency
      
      function repeat() {
        element
          .attr('opacity', 0)
          .attr('transform', 'translate(0, 0)')
          .transition()
          .duration(actualDuration)
          .ease(d3.easeLinear)
          .attrTween('transform', translateAlong(path as SVGPathElement)) // Type assertion since we've checked for null
          .attr('opacity', 0.8)
          .transition()
          .duration(100)
          .attr('opacity', 0)
          .on('end', repeat);
      }
      
      repeat();
    }
    
    // Helper function to create a translation along a path
    function translateAlong(path: SVGPathElement) {
      const l = path.getTotalLength();
      return function() {
        return function(t: number) {
          const p = path.getPointAtLength(t * l);
          return `translate(${p.x}, ${p.y})`;
        };
      };
    }
    
  }, [nodes, filteredFlows, width, height, onFlowClick, onNodeClick]);
  
  return (
    <SVGContainer width={width} height={height}>
      <svg ref={svgRef} width={width} height={height} />
    </SVGContainer>
  );
};

const SVGContainer = styled.div<{ width: number; height: number }>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export default FlowVisualization;

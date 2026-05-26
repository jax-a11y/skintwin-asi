import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

// Membrane types
export enum MembraneType {
  BIOLOGICAL = 'biological',
  COMPUTATIONAL = 'computational',
  CONCEPTUAL = 'conceptual'
}

// Membrane charge states
export enum MembraneChargeState {
  NEUTRAL = 'neutral',
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  ACTIVE = 'active'
}

// Membrane interface
export interface Membrane {
  id: string;
  type: MembraneType;
  label: string;
  chargeState: MembraneChargeState;
  parentId: string | null;
  children?: Membrane[];
  objects?: MembraneObject[];
  rules?: MembraneRule[];
}

// Membrane object interface
export interface MembraneObject {
  id: string;
  label: string;
  quantity: number;
  state: string;
}

// Membrane rule interface
export interface MembraneRule {
  id: string;
  label: string;
  priority: number;
  guard?: string;
}

// Props for the membrane visualization component
export interface MembraneVisualizationProps {
  membranes: Membrane[];
  width: number;
  height: number;
  selectedMembraneTypes?: MembraneType[];
  onMembraneClick?: (membrane: Membrane) => void;
  onObjectClick?: (object: MembraneObject, membrane: Membrane) => void;
  onRuleClick?: (rule: MembraneRule, membrane: Membrane) => void;
}

// Membrane nesting visualization component
const MembraneVisualization: React.FC<MembraneVisualizationProps> = ({
  membranes,
  width,
  height,
  selectedMembraneTypes = Object.values(MembraneType),
  onMembraneClick,
  onObjectClick,
  onRuleClick
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [expandedMembranes, setExpandedMembranes] = useState<Set<string>>(new Set());

  // Filter membranes based on selected types
  const filteredMembranes = membranes.filter(membrane => 
    selectedMembraneTypes.includes(membrane.type)
  );

  // Toggle membrane expansion state
  const toggleMembraneExpansion = (membraneId: string) => {
    setExpandedMembranes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(membraneId)) {
        newSet.delete(membraneId);
      } else {
        newSet.add(membraneId);
      }
      return newSet;
    });
  };

  // Membrane color constants
  const MEMBRANE_TYPE_COLORS = {
    [MembraneType.BIOLOGICAL]: '#32CD32', // Green
    [MembraneType.COMPUTATIONAL]: '#1E90FF', // Blue
    [MembraneType.CONCEPTUAL]: '#9370DB', // Purple
  };

  // Membrane charge state colors
  const MEMBRANE_CHARGE_COLORS = {
    [MembraneChargeState.NEUTRAL]: '#A9A9A9', // Gray
    [MembraneChargeState.POSITIVE]: '#32CD32', // Green
    [MembraneChargeState.NEGATIVE]: '#DC143C', // Red
    [MembraneChargeState.ACTIVE]: '#FFD700', // Yellow
  };

  // Membrane stroke styles
  const MEMBRANE_STROKE_STYLES = {
    [MembraneType.BIOLOGICAL]: 'none',
    [MembraneType.COMPUTATIONAL]: '5,5',
    [MembraneType.CONCEPTUAL]: '2,2',
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    
    // Clear previous content
    svg.selectAll('*').remove();
    
    // Create main group for transformations
    const g = svg.append('g');

    // Create hierarchy from membranes
    const createHierarchy = (membranes: Membrane[], parentId: string | null = null): d3.HierarchyNode<Membrane> => {
      // Find root membranes (those with matching parentId)
      const rootMembranes = membranes.filter(m => m.parentId === parentId);
      
      // If no root membranes and we're looking for the actual root, create a dummy root
      if (rootMembranes.length === 0 && parentId === null) {
        const dummyRoot: Membrane = {
          id: 'root',
          type: MembraneType.BIOLOGICAL,
          label: 'Root',
          chargeState: MembraneChargeState.NEUTRAL,
          parentId: null,
          children: membranes
        };
        return d3.hierarchy(dummyRoot);
      }
      
      // If we have multiple roots, create a dummy root to contain them
      if (rootMembranes.length > 1 && parentId === null) {
        const dummyRoot: Membrane = {
          id: 'root',
          type: MembraneType.BIOLOGICAL,
          label: 'Root',
          chargeState: MembraneChargeState.NEUTRAL,
          parentId: null,
          children: rootMembranes
        };
        return d3.hierarchy(dummyRoot);
      }
      
      // If we have a single root, use it directly
      if (rootMembranes.length === 1) {
        const root = rootMembranes[0];
        const hierarchyNode = d3.hierarchy(root);
        
        // Process children recursively
        const children = membranes.filter(m => m.parentId === root.id);
        if (children.length > 0) {
          // Create new hierarchy nodes for children without modifying read-only properties
          hierarchyNode.children = children.map(child => {
            return createHierarchy(membranes, child.id);
          });
        }
        
        return hierarchyNode;
      }
      
      // Fallback for empty data
      const dummyRoot: Membrane = {
        id: 'root',
        type: MembraneType.BIOLOGICAL,
        label: 'Empty',
        chargeState: MembraneChargeState.NEUTRAL,
        parentId: null
      };
      return d3.hierarchy(dummyRoot);
    };

    // Create hierarchy
    const root = createHierarchy(filteredMembranes);

    // Create pack layout
    const pack = d3.pack<Membrane>()
      .size([width - 40, height - 40])
      .padding(10);

    // Apply layout
    const packedRoot = pack(root);

    // Draw membranes
    const drawMembranes = (node: d3.HierarchyCircularNode<Membrane>, parent: d3.Selection<SVGGElement, unknown, null, undefined> = g) => {
      // Skip the dummy root if it exists
      if (node.data.id === 'root' && node.depth === 0) {
        if (node.children) {
          node.children.forEach(child => drawMembranes(child as d3.HierarchyCircularNode<Membrane>, parent));
        }
        return;
      }

      // Create group for this membrane
      const membraneGroup = parent.append('g')
        .attr('class', 'membrane')
        .attr('transform', `translate(${node.x}, ${node.y})`)
        .attr('data-id', node.data.id)
        .on('click', (event) => {
          event.stopPropagation();
          if (onMembraneClick) onMembraneClick(node.data);
          toggleMembraneExpansion(node.data.id);
        });

      // Draw membrane circle
      membraneGroup.append('circle')
        .attr('r', node.r)
        .attr('fill', MEMBRANE_TYPE_COLORS[node.data.type])
        .attr('fill-opacity', 0.2)
        .attr('stroke', MEMBRANE_CHARGE_COLORS[node.data.chargeState])
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', MEMBRANE_STROKE_STYLES[node.data.type]);

      // Add membrane label
      membraneGroup.append('text')
        .attr('dy', -node.r + 15)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text(node.data.label);

      // Check if membrane is expanded
      const isExpanded = expandedMembranes.has(node.data.id);

      // Draw children if expanded
      if (node.children && isExpanded) {
        node.children.forEach(child => 
          drawMembranes(child as d3.HierarchyCircularNode<Membrane>, membraneGroup)
        );
      } else if (node.children && !isExpanded) {
        // Show collapsed indicator
        membraneGroup.append('circle')
          .attr('r', 10)
          .attr('cy', 0)
          .attr('fill', '#fff')
          .attr('stroke', '#333')
          .attr('stroke-width', 1);

        membraneGroup.append('text')
          .attr('dy', 4)
          .attr('text-anchor', 'middle')
          .attr('font-size', '12px')
          .attr('font-weight', 'bold')
          .attr('fill', '#333')
          .text('+');
      }

      // Draw objects if this is a leaf or expanded membrane
      if ((!node.children || isExpanded) && node.data.objects && node.data.objects.length > 0) {
        const objectsGroup = membraneGroup.append('g')
          .attr('class', 'objects');

        // Calculate positions for objects in a grid
        const objectSize = 20;
        const objectsPerRow = Math.floor(node.r * 1.5 / objectSize);
        const rows = Math.ceil(node.data.objects.length / objectsPerRow);
        const startY = -rows * objectSize / 2;

        node.data.objects.forEach((object, i) => {
          const row = Math.floor(i / objectsPerRow);
          const col = i % objectsPerRow;
          const x = (col - objectsPerRow / 2) * objectSize + objectSize / 2;
          const y = startY + row * objectSize + objectSize / 2;

          const objectGroup = objectsGroup.append('g')
            .attr('class', 'object')
            .attr('transform', `translate(${x}, ${y})`)
            .on('click', (event) => {
              event.stopPropagation();
              if (onObjectClick) onObjectClick(object, node.data);
            });

          // Draw object circle
          objectGroup.append('circle')
            .attr('r', objectSize / 2 - 2)
            .attr('fill', '#fff')
            .attr('stroke', '#333')
            .attr('stroke-width', 1);

          // Add object label
          objectGroup.append('text')
            .attr('dy', 4)
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('fill', '#333')
            .text(object.label);
        });
      }

      // Draw rules if this is a leaf or expanded membrane
      if ((!node.children || isExpanded) && node.data.rules && node.data.rules.length > 0) {
        const rulesGroup = membraneGroup.append('g')
          .attr('class', 'rules');

        // Calculate positions for rules in a row at the bottom
        const ruleWidth = 40;
        const ruleHeight = 20;
        const startX = -node.data.rules.length * ruleWidth / 2;
        const y = node.r / 2 - ruleHeight;

        node.data.rules.forEach((rule, i) => {
          const x = startX + i * ruleWidth + ruleWidth / 2;

          const ruleGroup = rulesGroup.append('g')
            .attr('class', 'rule')
            .attr('transform', `translate(${x}, ${y})`)
            .on('click', (event) => {
              event.stopPropagation();
              if (onRuleClick) onRuleClick(rule, node.data);
            });

          // Draw rule rectangle
          ruleGroup.append('rect')
            .attr('x', -ruleWidth / 2 + 2)
            .attr('y', -ruleHeight / 2)
            .attr('width', ruleWidth - 4)
            .attr('height', ruleHeight)
            .attr('rx', 3)
            .attr('ry', 3)
            .attr('fill', '#f0f0f0')
            .attr('stroke', '#666')
            .attr('stroke-width', 1);

          // Add rule label
          ruleGroup.append('text')
            .attr('dy', 4)
            .attr('text-anchor', 'middle')
            .attr('font-size', '8px')
            .attr('fill', '#333')
            .text(rule.label);
        });
      }
    };

    // Draw all membranes starting from root
    drawMembranes(packedRoot);

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 10])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Center the visualization
    svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8));

  }, [filteredMembranes, width, height, expandedMembranes, onMembraneClick, onObjectClick, onRuleClick]);

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

export default MembraneVisualization;

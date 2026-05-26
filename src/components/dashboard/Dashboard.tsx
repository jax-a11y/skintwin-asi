import React, { useState } from 'react';
import styled from 'styled-components';
import FlowVisualization from '../flows/FlowVisualization';
import MembraneVisualization from '../membranes/MembraneVisualization';
import { ComponentNode, Flow, FlowType, FlowState, IntensityLevel, ComponentType } from '../flows/types';
import { Membrane, MembraneType, MembraneChargeState } from '../membranes/MembraneVisualization';

// Dashboard visualization modes
enum VisualizationMode {
  ARCHITECTURE = 'architecture',
  FLOWS = 'flows',
  MEMBRANES = 'membranes',
  COMBINED = 'combined'
}

// Dashboard props
interface DashboardProps {
  width: number;
  height: number;
}

// Main Dashboard component
const Dashboard: React.FC<DashboardProps> = ({ width, height }) => {
  // State for visualization mode
  const [visualizationMode, setVisualizationMode] = useState<VisualizationMode>(VisualizationMode.ARCHITECTURE);
  
  // State for selected components and flow types
  const [selectedComponentIds, setSelectedComponentIds] = useState<string[]>([]);
  const [selectedFlowTypes, setSelectedFlowTypes] = useState<FlowType[]>(Object.values(FlowType));
  
  // State for selected membrane types
  const [selectedMembraneTypes, setSelectedMembraneTypes] = useState<MembraneType[]>(Object.values(MembraneType));
  
  // State for selected component/membrane details
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  // Sample nodes data (would be fetched from API in real implementation)
  const nodes: ComponentNode[] = [
    {
      id: 'deep-tree-echo',
      type: ComponentType.DEEP_TREE_ECHO,
      label: 'Deep Tree Echo',
      x: 200,
      y: 200,
      width: 120,
      height: 60
    },
    {
      id: 'marduk',
      type: ComponentType.MARDUK,
      label: 'Marduk',
      x: 500,
      y: 200,
      width: 120,
      height: 60
    },
    {
      id: 'plingua-membrane',
      type: ComponentType.PLINGUA_MEMBRANE,
      label: 'PLingua Membrane',
      x: 200,
      y: 400,
      width: 120,
      height: 60
    },
    {
      id: 'jax-ceo',
      type: ComponentType.JAX_CEO,
      label: 'JAX CEO',
      x: 500,
      y: 400,
      width: 120,
      height: 60
    },
    {
      id: 'framework',
      type: ComponentType.FRAMEWORK,
      label: 'Relevance Framework',
      x: 350,
      y: 100,
      width: 120,
      height: 60
    },
    {
      id: 'application',
      type: ComponentType.APPLICATION,
      label: 'Applications',
      x: 350,
      y: 500,
      width: 120,
      height: 60
    }
  ];
  
  // Sample flows data (would be fetched from API in real implementation)
  const flows: Flow[] = [
    {
      id: 'flow-1',
      type: FlowType.DATA,
      source: 'deep-tree-echo',
      target: 'marduk',
      intensity: IntensityLevel.HIGH,
      state: FlowState.ACTIVE,
      latency: 0.2,
      reliability: 0.9,
      bandwidth: 0.8,
      label: 'Pattern Data'
    },
    {
      id: 'flow-2',
      type: FlowType.CONTROL,
      source: 'marduk',
      target: 'deep-tree-echo',
      intensity: IntensityLevel.MEDIUM,
      state: FlowState.ACTIVE,
      latency: 0.1,
      reliability: 0.95,
      bandwidth: 0.6,
      label: 'Focus Control'
    },
    {
      id: 'flow-3',
      type: FlowType.FEEDBACK,
      source: 'marduk',
      target: 'deep-tree-echo',
      intensity: IntensityLevel.LOW,
      state: FlowState.ACTIVE,
      latency: 0.3,
      reliability: 0.8,
      bandwidth: 0.4,
      label: 'Integration Feedback'
    },
    {
      id: 'flow-4',
      type: FlowType.META_COGNITIVE,
      source: 'deep-tree-echo',
      target: 'marduk',
      intensity: IntensityLevel.MEDIUM,
      state: FlowState.ACTIVE,
      latency: 0.4,
      reliability: 0.7,
      bandwidth: 0.5,
      label: 'Creative Potential'
    },
    {
      id: 'flow-5',
      type: FlowType.DATA,
      source: 'deep-tree-echo',
      target: 'plingua-membrane',
      intensity: IntensityLevel.MEDIUM,
      state: FlowState.ACTIVE,
      latency: 0.2,
      reliability: 0.85,
      bandwidth: 0.7,
      label: 'Pattern Templates'
    },
    {
      id: 'flow-6',
      type: FlowType.DATA,
      source: 'plingua-membrane',
      target: 'marduk',
      intensity: IntensityLevel.HIGH,
      state: FlowState.ACTIVE,
      latency: 0.1,
      reliability: 0.9,
      bandwidth: 0.8,
      label: 'P-system Models'
    },
    {
      id: 'flow-7',
      type: FlowType.CONTROL,
      source: 'jax-ceo',
      target: 'marduk',
      intensity: IntensityLevel.HIGH,
      state: FlowState.ACTIVE,
      latency: 0.1,
      reliability: 0.95,
      bandwidth: 0.9,
      label: 'Memory Orchestration'
    },
    {
      id: 'flow-8',
      type: FlowType.DATA,
      source: 'jax-ceo',
      target: 'plingua-membrane',
      intensity: IntensityLevel.MEDIUM,
      state: FlowState.ACTIVE,
      latency: 0.2,
      reliability: 0.85,
      bandwidth: 0.7,
      label: 'Optimized Parameters'
    },
    {
      id: 'flow-9',
      type: FlowType.FEEDBACK,
      source: 'framework',
      target: 'deep-tree-echo',
      intensity: IntensityLevel.MEDIUM,
      state: FlowState.ACTIVE,
      latency: 0.3,
      reliability: 0.8,
      bandwidth: 0.6,
      label: 'Relevance Feedback'
    },
    {
      id: 'flow-10',
      type: FlowType.FEEDBACK,
      source: 'framework',
      target: 'marduk',
      intensity: IntensityLevel.MEDIUM,
      state: FlowState.ACTIVE,
      latency: 0.3,
      reliability: 0.8,
      bandwidth: 0.6,
      label: 'Relevance Feedback'
    },
    {
      id: 'flow-11',
      type: FlowType.DATA,
      source: 'marduk',
      target: 'application',
      intensity: IntensityLevel.HIGH,
      state: FlowState.ACTIVE,
      latency: 0.1,
      reliability: 0.9,
      bandwidth: 0.8,
      label: 'Analysis Results'
    },
    {
      id: 'flow-12',
      type: FlowType.DATA,
      source: 'deep-tree-echo',
      target: 'application',
      intensity: IntensityLevel.MEDIUM,
      state: FlowState.ACTIVE,
      latency: 0.2,
      reliability: 0.85,
      bandwidth: 0.7,
      label: 'Insights'
    }
  ];
  
  // Sample membranes data (would be fetched from API in real implementation)
  const membranes: Membrane[] = [
    {
      id: 'skin-system',
      type: MembraneType.BIOLOGICAL,
      label: 'Skin System',
      chargeState: MembraneChargeState.NEUTRAL,
      parentId: null
    },
    {
      id: 'epidermis',
      type: MembraneType.BIOLOGICAL,
      label: 'Epidermis',
      chargeState: MembraneChargeState.NEUTRAL,
      parentId: 'skin-system'
    },
    {
      id: 'stratum-corneum',
      type: MembraneType.BIOLOGICAL,
      label: 'Stratum Corneum',
      chargeState: MembraneChargeState.NEUTRAL,
      parentId: 'epidermis',
      objects: [
        { id: 'obj-1', label: 'Lipid', quantity: 10, state: 'normal' },
        { id: 'obj-2', label: 'Protein', quantity: 15, state: 'normal' }
      ],
      rules: [
        { id: 'rule-1', label: 'Desq', priority: 1 },
        { id: 'rule-2', label: 'Hydra', priority: 2 }
      ]
    },
    {
      id: 'stratum-granulosum',
      type: MembraneType.BIOLOGICAL,
      label: 'Stratum Granulosum',
      chargeState: MembraneChargeState.POSITIVE,
      parentId: 'epidermis'
    },
    {
      id: 'keratinocyte',
      type: MembraneType.BIOLOGICAL,
      label: 'Keratinocyte',
      chargeState: MembraneChargeState.ACTIVE,
      parentId: 'stratum-granulosum',
      objects: [
        { id: 'obj-3', label: 'KHG', quantity: 5, state: 'active' },
        { id: 'obj-4', label: 'LB', quantity: 8, state: 'active' }
      ],
      rules: [
        { id: 'rule-3', label: 'Diff', priority: 1 },
        { id: 'rule-4', label: 'Syn', priority: 2 }
      ]
    },
    {
      id: 'dermis',
      type: MembraneType.BIOLOGICAL,
      label: 'Dermis',
      chargeState: MembraneChargeState.NEUTRAL,
      parentId: 'skin-system'
    },
    {
      id: 'p-system',
      type: MembraneType.COMPUTATIONAL,
      label: 'P-System',
      chargeState: MembraneChargeState.NEUTRAL,
      parentId: null
    },
    {
      id: 'transition-membrane',
      type: MembraneType.COMPUTATIONAL,
      label: 'Transition Membrane',
      chargeState: MembraneChargeState.NEUTRAL,
      parentId: 'p-system',
      objects: [
        { id: 'obj-5', label: 'a', quantity: 3, state: 'normal' },
        { id: 'obj-6', label: 'b', quantity: 2, state: 'normal' }
      ],
      rules: [
        { id: 'rule-5', label: 'r1', priority: 1 },
        { id: 'rule-6', label: 'r2', priority: 2 }
      ]
    },
    {
      id: 'division-membrane',
      type: MembraneType.COMPUTATIONAL,
      label: 'Division Membrane',
      chargeState: MembraneChargeState.POSITIVE,
      parentId: 'p-system'
    },
    {
      id: 'knowledge-domain',
      type: MembraneType.CONCEPTUAL,
      label: 'Knowledge Domain',
      chargeState: MembraneChargeState.NEUTRAL,
      parentId: null
    },
    {
      id: 'skin-biology',
      type: MembraneType.CONCEPTUAL,
      label: 'Skin Biology',
      chargeState: MembraneChargeState.NEUTRAL,
      parentId: 'knowledge-domain'
    },
    {
      id: 'dermatology',
      type: MembraneType.CONCEPTUAL,
      label: 'Dermatology',
      chargeState: MembraneChargeState.NEUTRAL,
      parentId: 'knowledge-domain'
    }
  ];
  
  // Handle component click
  const handleNodeClick = (node: ComponentNode) => {
    setSelectedItem(node);
  };
  
  // Handle flow click
  const handleFlowClick = (flow: Flow) => {
    setSelectedItem(flow);
  };
  
  // Handle membrane click
  const handleMembraneClick = (membrane: Membrane) => {
    setSelectedItem(membrane);
  };
  
  // Toggle flow type selection
  const toggleFlowType = (flowType: FlowType) => {
    setSelectedFlowTypes(prev => {
      if (prev.includes(flowType)) {
        return prev.filter(type => type !== flowType);
      } else {
        return [...prev, flowType];
      }
    });
  };
  
  // Toggle membrane type selection
  const toggleMembraneType = (membraneType: MembraneType) => {
    setSelectedMembraneTypes(prev => {
      if (prev.includes(membraneType)) {
        return prev.filter(type => type !== membraneType);
      } else {
        return [...prev, membraneType];
      }
    });
  };
  
  // Render visualization based on mode
  const renderVisualization = () => {
    switch (visualizationMode) {
      case VisualizationMode.ARCHITECTURE:
        return (
          <FlowVisualization
            nodes={nodes}
            flows={[]}
            width={width - 300}
            height={height - 150}
            onNodeClick={handleNodeClick}
          />
        );
      case VisualizationMode.FLOWS:
        return (
          <FlowVisualization
            nodes={nodes}
            flows={flows}
            width={width - 300}
            height={height - 150}
            selectedFlowTypes={selectedFlowTypes}
            selectedComponentIds={selectedComponentIds}
            onNodeClick={handleNodeClick}
            onFlowClick={handleFlowClick}
          />
        );
      case VisualizationMode.MEMBRANES:
        return (
          <MembraneVisualization
            membranes={membranes}
            width={width - 300}
            height={height - 150}
            selectedMembraneTypes={selectedMembraneTypes}
            onMembraneClick={handleMembraneClick}
          />
        );
      case VisualizationMode.COMBINED:
        // In a real implementation, this would be a more sophisticated combined view
        return (
          <div style={{ position: 'relative', width: width - 300, height: height - 150 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.7 }}>
              <FlowVisualization
                nodes={nodes}
                flows={flows}
                width={width - 300}
                height={height - 150}
                selectedFlowTypes={selectedFlowTypes}
                selectedComponentIds={selectedComponentIds}
                onNodeClick={handleNodeClick}
                onFlowClick={handleFlowClick}
              />
            </div>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.7 }}>
              <MembraneVisualization
                membranes={membranes}
                width={width - 300}
                height={height - 150}
                selectedMembraneTypes={selectedMembraneTypes}
                onMembraneClick={handleMembraneClick}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Render details panel based on selected item
  const renderDetailsPanel = () => {
    if (!selectedItem) {
      return (
        <DetailsPanelEmpty>
          <h3>No item selected</h3>
          <p>Click on a component, flow, or membrane to view details.</p>
        </DetailsPanelEmpty>
      );
    }
    
    // Component details
    if ('width' in selectedItem) {
      return (
        <DetailsPanel>
          <h3>Component Details</h3>
          <DetailRow>
            <DetailLabel>Name:</DetailLabel>
            <DetailValue>{selectedItem.label}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Type:</DetailLabel>
            <DetailValue>{selectedItem.type}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Position:</DetailLabel>
            <DetailValue>({selectedItem.x}, {selectedItem.y})</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Size:</DetailLabel>
            <DetailValue>{selectedItem.width} x {selectedItem.height}</DetailValue>
          </DetailRow>
        </DetailsPanel>
      );
    }
    
    // Flow details
    if ('source' in selectedItem && 'target' in selectedItem) {
      return (
        <DetailsPanel>
          <h3>Flow Details</h3>
          <DetailRow>
            <DetailLabel>Label:</DetailLabel>
            <DetailValue>{selectedItem.label || 'Unnamed Flow'}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Type:</DetailLabel>
            <DetailValue>{selectedItem.type}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Source:</DetailLabel>
            <DetailValue>{nodes.find(n => n.id === selectedItem.source)?.label || selectedItem.source}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Target:</DetailLabel>
            <DetailValue>{nodes.find(n => n.id === selectedItem.target)?.label || selectedItem.target}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Intensity:</DetailLabel>
            <DetailValue>{selectedItem.intensity}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>State:</DetailLabel>
            <DetailValue>{selectedItem.state}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Latency:</DetailLabel>
            <DetailValue>{Math.round(selectedItem.latency * 100)}%</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Reliability:</DetailLabel>
            <DetailValue>{Math.round(selectedItem.reliability * 100)}%</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Bandwidth:</DetailLabel>
            <DetailValue>{Math.round(selectedItem.bandwidth * 100)}%</DetailValue>
          </DetailRow>
        </DetailsPanel>
      );
    }
    
    // Membrane details
    if ('chargeState' in selectedItem) {
      return (
        <DetailsPanel>
          <h3>Membrane Details</h3>
          <DetailRow>
            <DetailLabel>Name:</DetailLabel>
            <DetailValue>{selectedItem.label}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Type:</DetailLabel>
            <DetailValue>{selectedItem.type}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Charge:</DetailLabel>
            <DetailValue>{selectedItem.chargeState}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Parent:</DetailLabel>
            <DetailValue>
              {selectedItem.parentId ? 
                membranes.find(m => m.id === selectedItem.parentId)?.label || selectedItem.parentId : 
                'None (Root)'}
            </DetailValue>
          </DetailRow>
          {selectedItem.objects && (
            <>
              <h4>Objects ({selectedItem.objects.length})</h4>
              {selectedItem.objects.map((obj: {id: string; label: string; quantity: number; state: string}) => (
                <DetailRow key={obj.id}>
                  <DetailLabel>{obj.label}:</DetailLabel>
                  <DetailValue>{obj.quantity} ({obj.state})</DetailValue>
                </DetailRow>
              ))}
            </>
          )}
          {selectedItem.rules && (
            <>
              <h4>Rules ({selectedItem.rules.length})</h4>
              {selectedItem.rules.map((rule: {id: string; label: string; priority: number}) => (
                <DetailRow key={rule.id}>
                  <DetailLabel>{rule.label}:</DetailLabel>
                  <DetailValue>Priority {rule.priority}</DetailValue>
                </DetailRow>
              ))}
            </>
          )}
        </DetailsPanel>
      );
    }
    
    return (
      <DetailsPanelEmpty>
        <h3>Unknown item type</h3>
        <p>The selected item type is not recognized.</p>
      </DetailsPanelEmpty>
    );
  };
  
  return (
    <DashboardContainer>
      <TopPanel>
        <Logo>SkinTwin-ASI</Logo>
        <VisualizationModeSelector>
          <ModeButton 
            active={visualizationMode === VisualizationMode.ARCHITECTURE}
            onClick={() => setVisualizationMode(VisualizationMode.ARCHITECTURE)}
          >
            Architecture
          </ModeButton>
          <ModeButton 
            active={visualizationMode === VisualizationMode.FLOWS}
            onClick={() => setVisualizationMode(VisualizationMode.FLOWS)}
          >
            Flows
          </ModeButton>
          <ModeButton 
            active={visualizationMode === VisualizationMode.MEMBRANES}
            onClick={() => setVisualizationMode(VisualizationMode.MEMBRANES)}
          >
            Membranes
          </ModeButton>
          <ModeButton 
            active={visualizationMode === VisualizationMode.COMBINED}
            onClick={() => setVisualizationMode(VisualizationMode.COMBINED)}
          >
            Combined
          </ModeButton>
        </VisualizationModeSelector>
        <GlobalSearch placeholder="Search components, flows, membranes..." />
        <SettingsButton>⚙️</SettingsButton>
      </TopPanel>
      
      <MainContent>
        <LeftSidebar>
          <SidebarSection>
            <SidebarTitle>Component Hierarchy</SidebarTitle>
            <TreeView>
              <TreeItem expanded>
                <TreeItemLabel>Application Layer</TreeItemLabel>
                <TreeItemChildren>
                  <TreeItem>
                    <TreeItemLabel>Flow Designer</TreeItemLabel>
                  </TreeItem>
                  <TreeItem>
                    <TreeItemLabel>Analysis Studio</TreeItemLabel>
                  </TreeItem>
                  <TreeItem>
                    <TreeItemLabel>Intervention Planner</TreeItemLabel>
                  </TreeItem>
                  <TreeItem>
                    <TreeItemLabel>Membrane Modeler</TreeItemLabel>
                  </TreeItem>
                </TreeItemChildren>
              </TreeItem>
              <TreeItem expanded>
                <TreeItemLabel>Framework Layer</TreeItemLabel>
                <TreeItemChildren>
                  <TreeItem>
                    <TreeItemLabel>Relevance Realization</TreeItemLabel>
                  </TreeItem>
                  <TreeItem>
                    <TreeItemLabel>Triadic Polarities</TreeItemLabel>
                  </TreeItem>
                  <TreeItem>
                    <TreeItemLabel>Axis Mundi Alignment</TreeItemLabel>
                  </TreeItem>
                </TreeItemChildren>
              </TreeItem>
              <TreeItem expanded>
                <TreeItemLabel>Agent Layer</TreeItemLabel>
                <TreeItemChildren>
                  <TreeItem>
                    <TreeItemLabel>Deep Tree Echo</TreeItemLabel>
                  </TreeItem>
                  <TreeItem>
                    <TreeItemLabel>Marduk</TreeItemLabel>
                  </TreeItem>
                  <TreeItem>
                    <TreeItemLabel>PLingua Membrane</TreeItemLabel>
                  </TreeItem>
                  <TreeItem>
                    <TreeItemLabel>JAX CEO</TreeItemLabel>
                  </TreeItem>
                </TreeItemChildren>
              </TreeItem>
            </TreeView>
          </SidebarSection>
          
          <SidebarSection>
            <SidebarTitle>Layer Controls</SidebarTitle>
            <CheckboxGroup>
              <CheckboxLabel>
                <Checkbox checked={true} onChange={() => {}} />
                Architecture Layer
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox checked={true} onChange={() => {}} />
                Flow Layer
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox checked={true} onChange={() => {}} />
                Membrane Layer
              </CheckboxLabel>
            </CheckboxGroup>
            
            <SidebarSubtitle>Flow Types</SidebarSubtitle>
            <CheckboxGroup>
              <CheckboxLabel>
                <Checkbox 
                  checked={selectedFlowTypes.includes(FlowType.DATA)} 
                  onChange={() => toggleFlowType(FlowType.DATA)} 
                />
                Data Flows
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox 
                  checked={selectedFlowTypes.includes(FlowType.CONTROL)} 
                  onChange={() => toggleFlowType(FlowType.CONTROL)} 
                />
                Control Flows
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox 
                  checked={selectedFlowTypes.includes(FlowType.FEEDBACK)} 
                  onChange={() => toggleFlowType(FlowType.FEEDBACK)} 
                />
                Feedback Flows
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox 
                  checked={selectedFlowTypes.includes(FlowType.META_COGNITIVE)} 
                  onChange={() => toggleFlowType(FlowType.META_COGNITIVE)} 
                />
                Meta-Cognitive Flows
              </CheckboxLabel>
            </CheckboxGroup>
            
            <SidebarSubtitle>Membrane Types</SidebarSubtitle>
            <CheckboxGroup>
              <CheckboxLabel>
                <Checkbox 
                  checked={selectedMembraneTypes.includes(MembraneType.BIOLOGICAL)} 
                  onChange={() => toggleMembraneType(MembraneType.BIOLOGICAL)} 
                />
                Biological
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox 
                  checked={selectedMembraneTypes.includes(MembraneType.COMPUTATIONAL)} 
                  onChange={() => toggleMembraneType(MembraneType.COMPUTATIONAL)} 
                />
                Computational
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox 
                  checked={selectedMembraneTypes.includes(MembraneType.CONCEPTUAL)} 
                  onChange={() => toggleMembraneType(MembraneType.CONCEPTUAL)} 
                />
                Conceptual
              </CheckboxLabel>
            </CheckboxGroup>
          </SidebarSection>
          
          <SidebarSection>
            <SidebarTitle>Bookmarks</SidebarTitle>
            <BookmarkList>
              <BookmarkItem>Default View</BookmarkItem>
              <BookmarkItem>Marduk Memory System</BookmarkItem>
              <BookmarkItem>Skin Barrier Model</BookmarkItem>
              <BookmarkItem>+ Add Current View</BookmarkItem>
            </BookmarkList>
          </SidebarSection>
        </LeftSidebar>
        
        <CentralArea>
          {renderVisualization()}
        </CentralArea>
        
        <RightSidebar>
          {renderDetailsPanel()}
        </RightSidebar>
      </MainContent>
      
      <BottomPanel>
        <TimelineControls>
          <TimelineButton>◀◀</TimelineButton>
          <TimelineButton>◀</TimelineButton>
          <TimelineButton>■</TimelineButton>
          <TimelineButton>▶</TimelineButton>
          <TimelineButton>▶▶</TimelineButton>
          <TimelineSlider type="range" min="0" max="100" value="0" />
        </TimelineControls>
        <StatusInfo>
          <StatusItem>
            <StatusLabel>Simulation Speed:</StatusLabel>
            <StatusValue>1.0x</StatusValue>
          </StatusItem>
          <StatusItem>
            <StatusLabel>Current Time:</StatusLabel>
            <StatusValue>00:00:00</StatusValue>
          </StatusItem>
          <StatusItem>
            <StatusLabel>Active Processes:</StatusLabel>
            <StatusValue>None</StatusValue>
          </StatusItem>
        </StatusInfo>
      </BottomPanel>
    </DashboardContainer>
  );
};

// Styled components
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const TopPanel = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-right: 30px;
`;

const VisualizationModeSelector = styled.div`
  display: flex;
  margin-right: 30px;
`;

const ModeButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  background-color: ${props => props.active ? '#4169E1' : '#f0f0f0'};
  color: ${props => props.active ? '#fff' : '#333'};
  border: none;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#4169E1' : '#e0e0e0'};
  }
`;

const GlobalSearch = styled.input`
  flex: 1;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #4169E1;
  }
`;

const SettingsButton = styled.button`
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: 16px;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const LeftSidebar = styled.div`
  width: 250px;
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  padding: 16px;
`;

const SidebarSection = styled.div`
  margin-bottom: 24px;
`;

const SidebarTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #333;
`;

const SidebarSubtitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin: 16px 0 8px 0;
  color: #555;
`;

const TreeView = styled.div`
  font-size: 14px;
`;

const TreeItem = styled.div<{ expanded?: boolean }>`
  margin-bottom: 4px;
`;

const TreeItemLabel = styled.div`
  padding: 6px 8px;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const TreeItemChildren = styled.div`
  margin-left: 16px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 8px;
`;

const BookmarkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BookmarkItem = styled.div`
  padding: 6px 8px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: #f0f0f0;
  }
  
  &:last-child {
    color: #4169E1;
    font-style: italic;
  }
`;

const CentralArea = styled.div`
  flex: 1;
  padding: 16px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightSidebar = styled.div`
  width: 300px;
  background-color: #fff;
  border-left: 1px solid #e0e0e0;
  overflow-y: auto;
  padding: 16px;
`;

const DetailsPanel = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: #333;
  }
  
  h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 16px 0 8px 0;
    color: #555;
  }
`;

const DetailsPanelEmpty = styled(DetailsPanel)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  text-align: center;
  color: #888;
  
  h3 {
    color: #888;
  }
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const DetailLabel = styled.div`
  width: 100px;
  font-weight: 600;
  color: #555;
`;

const DetailValue = styled.div`
  flex: 1;
`;

const BottomPanel = styled.div`
  height: 80px;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const TimelineControls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const TimelineButton = styled.button`
  width: 36px;
  height: 36px;
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const TimelineSlider = styled.input`
  flex: 1;
  margin: 0 16px;
`;

const StatusInfo = styled.div`
  display: flex;
`;

const StatusItem = styled.div`
  display: flex;
  margin-right: 24px;
`;

const StatusLabel = styled.div`
  font-weight: 600;
  margin-right: 8px;
  color: #555;
`;

const StatusValue = styled.div`
  color: #333;
`;

export default Dashboard;

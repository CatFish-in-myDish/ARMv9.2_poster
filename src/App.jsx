import './App.css'

function App() {
  return (
    <div className="poster">
      <Header />
      <div className="body">
        <Column1 />
        <Column2 />
        <RightSide />
      </div>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <div className="hdr">
      <div className="hdr-top">
        <div className="hdr-left" style={{ textAlign: 'center' }}>
          <h1>ARMv9.2 Architecture</h1>
        </div>
        <div className="hdr-logo">
          <div className="arm-logo">ARM™</div>
        </div>
      </div>

    </div>
  )
}


function Card({ title, headerClass, grow, children }) {
  return (
    <div className={`card ${grow ? 'grow' : ''}`}>
      <div className={`ch ${headerClass}`}>{title}</div>
      <div className="cb">
        {children}
      </div>
    </div>
  )
}

function Column1() {
  return (
    <div className="col">
      <Card title="Architecture Overview" headerClass="ch-blue">
        <CoaArchitecture />
        <br />
        <div style={{ fontSize: '15.8px', color: '#000', lineHeight: 1.35, marginTop: '10px', padding: '0 4px' }}>
          <p style={{ margin: '0 0 6px', color: '#000' }}>
            ARMv9.2 evolves the RISC architecture to prioritize hardware-assisted security, specialized AI/ML acceleration, and scalable high-performance compute workloads.
          </p>
          <p style={{ margin: '0 0 6px', color: '#000' }}>
            The Realm Management Extension (RME) introduces Realm and Root security states, providing hardware-enforced isolation for sensitive data from untrusted privileged software.
          </p>
          <p style={{ margin: '0 0 6px', color: '#000' }}>
            The Exception Level model (EL0–EL3) defines strict privilege boundaries, ranging from user-mode applications (EL0) to the Secure Monitor and Firmware (EL3).
          </p>
          <p style={{ margin: '0 0 6px', color: '#000' }}>
            Memory architecture supports up to 52-bit physical addressing with multi-stage translation regimes and hardware-assisted virtualization (Stage-2 mapping).
          </p>
          <p style={{ margin: '0', color: '#000' }}>
            Advanced SIMD via SVE2 and the Scalable Matrix Extension (SME) provide vector-length agnostic processing and 2D matrix acceleration for complex mathematical kernels.
          </p>
        </div>
        {/* <div className="sg">
          <StatBox label="Execution State" value="AArch64 ONLY" />
          <StatBox label="Virtual Addressing" value="Up to 64-bit VAs" />
          <StatBox label="Physical Addressing" value="Up to 52-bit PAs" />
          <StatBox label="Translation Levels" value="Up to 4 levels" />
        </div> */}
      </Card>
      <Card title="Register Structure (AArch64)" headerClass="ch-cyan" grow>
        <CoaRegisters />
        <RegisterTable />
      </Card>
    </div>
  )
}

function Column2() {
  return (
    <div className="col">
      <Card title="ISA Instruction Types (A64)" headerClass="ch-navy">
        <InstructionTypeTable />
      </Card>
      <Card title="Instruction Formats (Architectural Class)" headerClass="ch-blue">
        <p style={{ fontSize: '10.8px', color: '#334155', marginBottom: '4px' }}>
          ARMv9.2 instructions are <b>32 bits wide</b>. Formats are logically classed by operand type:
        </p>

        <h4 style={{ margin: '4px 0 2px' }}>R-Type — Register–Register &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(ADD, SUB, AND, ORR…)</span></h4>
        <div className="fmt-row" style={{ margin: '2px 0' }}>
          <div className="fmt-seg fs-op" style={{ flex: 11 }}>Opcode<br />11b</div>
          <div className="fmt-seg fs-rm" style={{ flex: 5 }}>Rm<br />5b</div>
          <div className="fmt-seg fs-sh" style={{ flex: 6 }}>Shift<br />6b</div>
          <div className="fmt-seg fs-rn" style={{ flex: 5 }}>Rn<br />5b</div>
          <div className="fmt-seg fs-rd" style={{ flex: 5 }}>Rd<br />5b</div>
        </div>

        <h4 style={{ margin: '4px 0 2px' }}>I-Type — Immediate &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(ADDI, SUBI, MOVZ, MOVK…)</span></h4>
        <div className="fmt-row" style={{ margin: '2px 0' }}>
          <div className="fmt-seg fs-op" style={{ flex: 10 }}>Opcode<br />10b</div>
          <div className="fmt-seg fs-im" style={{ flex: 12 }}>Immediate<br />12b</div>
          <div className="fmt-seg fs-rn" style={{ flex: 5 }}>Rn<br />5b</div>
          <div className="fmt-seg fs-rd" style={{ flex: 5 }}>Rd<br />5b</div>
        </div>

        <h4 style={{ margin: '4px 0 2px' }}>D-Type — Load / Store &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(LDR, STR, LDUR, STUR…)</span></h4>
        <div className="fmt-row" style={{ margin: '2px 0' }}>
          <div className="fmt-seg fs-op" style={{ flex: 11 }}>Opcode<br />11b</div>
          <div className="fmt-seg fs-of" style={{ flex: 9 }}>Offset<br />9b</div>
          <div className="fmt-seg fs-op2" style={{ flex: 2 }}>Op<br />2b</div>
          <div className="fmt-seg fs-rn" style={{ flex: 5 }}>Rn<br />5b</div>
          <div className="fmt-seg fs-rd" style={{ flex: 5 }}>Rt<br />5b</div>
        </div>

        <h4 style={{ margin: '4px 0 2px' }}>CB-TYPE — Compare & Branch &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(CBZ, CBNZ)</span></h4>
        <div className="fmt-row" style={{ margin: '2px 0' }}>
          <div className="fmt-seg fs-op" style={{ flex: 8 }}>Opcode<br />8b</div>
          <div className="fmt-seg fs-rd" style={{ flex: 5 }}>Rt<br />5b</div>
          <div className="fmt-seg fs-of" style={{ flex: 19 }}>PC-Relative Offset · 19b</div>
        </div>

        <h4 style={{ margin: '4px 0 2px' }}>TB-TYPE — Test Bit & Branch &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(TBZ, TBNZ)</span></h4>
        <div className="fmt-row" style={{ margin: '2px 0' }}>
          <div className="fmt-seg fs-op" style={{ flex: 6 }}>Opcode<br />6b</div>
          <div className="fmt-seg fs-rd" style={{ flex: 5 }}>Rt<br />5b</div>
          <div className="fmt-seg fs-sh" style={{ flex: 6 }}>Bit pos<br />6b</div>
          <div className="fmt-seg fs-of" style={{ flex: 15 }}>PC-Relative Offset · 15b</div>
        </div>

        <h4 style={{ margin: '4px 0 2px' }}>B-Type — Branch &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(B, BL, B.cond, BLR…)</span></h4>
        <div className="fmt-row" style={{ margin: '2px 0' }}>
          <div className="fmt-seg fs-op" style={{ flex: 6 }}>Opcode<br />6b</div>
          <div className="fmt-seg fs-of" style={{ flex: 26 }}>PC-Relative Offset &nbsp;·&nbsp; 26b</div>
        </div>

        <h4 style={{ margin: '4px 0 2px' }}>SYSTEM-TYPE — System / Control &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(MSR, MRS, HINT, ERET)</span></h4>
        <div className="fmt-row" style={{ margin: '2px 0' }}>
          <div className="fmt-seg fs-op" style={{ flex: 10 }}>Opcode<br />10b</div>
          <div className="fmt-seg fs-im" style={{ flex: 22 }}>System Register / Immediate · 22b</div>
        </div>
      </Card>
      <Card title="Addressing Modes" headerClass="ch-cyan">
        <div className="ac-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          <div className="ac-chip" style={{ padding: '2px' }}>Base Reg<br />[Xn]</div>
          <div className="ac-chip" style={{ padding: '2px' }}>Imm Offset<br />[Xn, #imm]</div>
          <div className="ac-chip" style={{ padding: '2px' }}>Reg Offset<br />[Xn, Xm]</div>
          <div className="ac-chip" style={{ padding: '2px' }}>Pre-Index<br />[Xn, #imm]!</div>
          <div className="ac-chip" style={{ padding: '2px' }}>Post-Index<br />[Xn], #imm</div>
          <div className="ac-chip" style={{ padding: '2px' }}>Reg Extend<br />[Xn, Wm, SXTW / UXTW]</div>
        </div>
        <div className="ac-grid" style={{ gridTemplateColumns: '1fr 1.2fr', gap: '2px', marginTop: '2px' }}>
          <div className="ac-chip" style={{ padding: '2px' }}>PC-Relative Load<br />LDR Xt, label (via ADRP + ADD)</div>
          <div className="ac-chip" style={{ padding: '2px' }}>Pair Addressing<br />LDP / STP [Xn, #imm]</div>
        </div>
        {/* <br /> */}
        <p style={{ marginTop: '4px', fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
          {/* <strong>A64 Logic:</strong> ADRP provides ±4GB range. <strong>Pre/Post-index</strong> simplify pointer arithmetic. <strong>Register Extend</strong> allows offset extension. */}
          AArch64 supports base, immediate, and register-offset addressing with optional scaling and write-back for efficient pointer arithmetic.
        </p>
      </Card>

      <ISAClarification />
    </div >
  )
}

function PipelineVisualization() {
  const stages = [
    { id: 'IF', name: 'Fetch', color: 'pb1' },
    { id: 'ID', name: 'Decode', color: 'pb2' },
    { id: 'EX', name: 'Execute', color: 'pb3' },
    { id: 'MEM', name: 'Memory', color: 'pb4' },
    { id: 'WB', name: 'Writeback', color: 'pb5' },
    { id: 'CMT', name: 'Commit', color: 'pb6' },
  ];

  return (
    <div className="pipe-viz-container" style={{ height: '140px', overflow: 'hidden' }}>
      <svg className="pipe-svg-overlay" preserveAspectRatio="none" viewBox="0 0 800 140">
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#334155" />
          </marker>
          <marker id="feedbackhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
          </marker>
        </defs>

        {/* Horizontal Flow Arrows */}
        <g className="flow-arrows">
          <path d="M136,70 L160,70" fill="none" stroke="#334155" strokeWidth="1.5" vectorEffect="non-scaling-stroke" markerEnd="url(#arrowhead)" />
          <path d="M262,70 L286,70" fill="none" stroke="#334155" strokeWidth="1.5" vectorEffect="non-scaling-stroke" markerEnd="url(#arrowhead)" />
          <path d="M388,70 L412,70" fill="none" stroke="#334155" strokeWidth="1.5" vectorEffect="non-scaling-stroke" markerEnd="url(#arrowhead)" />
          <path d="M514,70 L538,70" fill="none" stroke="#334155" strokeWidth="1.5" vectorEffect="non-scaling-stroke" markerEnd="url(#arrowhead)" />
          <path d="M640,70 L664,70" fill="none" stroke="#334155" strokeWidth="1.5" vectorEffect="non-scaling-stroke" markerEnd="url(#arrowhead)" />
        </g>

        {/* Forwarding Feedback (EX/MEM back to EX) */}
        <path d="M430,70 Q430,15 305,15 Q305,60 305,60" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4,4" vectorEffect="non-scaling-stroke" markerEnd="url(#feedbackhead)" />
        <text x="340" y="10" fontSize="8" fontWeight="bold" fill="#64748b">FORWARDING</text>

        {/* Branch Prediction Feedback (EX back to IF) */}
        <path d="M305,80 Q305,125 55,125 Q55,85 55,85" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4,4" vectorEffect="non-scaling-stroke" markerEnd="url(#feedbackhead)" />
        <text x="318" y="120" fontSize="8" fontWeight="bold" fill="#64748b">BRANCH RESOLUTION & FEEDBACK</text>
      </svg>

      <div className="pipe-wrap">
        {stages.map((s) => (
          <div key={s.id} className={`pipe-box ${s.color}`}>
            {s.id}
            <span className="pipe-sub">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RightSide() {
  const essentialFeatures = [
    ["Realm Mgmt Extension (RME)", "Hardware-based trust states (Root, Realm, Secure). Enables Arm CCA."],
    ["SME — Scalable Matrix Ext.", "2D ZA tile register file for matrix acceleration. Optimized for AI/ML."],
    ["SVE2 — Scalable Vector Ext. v2", "Vector-length agnostic SIMD (128–2048 bits) with DSP enhancements."],
    ["Memory Tagging Ext. (MTE)", "Hardware-assisted memory safety: detects use-after-free and buffer overflows."],
    ["Pointer Authentication (PAC)", "Signatures on pointers to mitigate ROP/JOP attacks."],
    ["Branch Target ID (BTI)", "Indirect branch target enforcement to limit gadget exploits."]
  ];

  return (
    <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Card title="Datapath Diagram & Flow (Generic ARMv9.2 Core — Conceptual)" headerClass="ch-dark">
        <CoaDatapath />
      </Card>

      <Card title="Standard Architectural Pipeline Stages" headerClass="ch-blue">
        <PipelineVisualization />

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px', marginTop: '4px' }}>
          <div style={{ padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <div style={{ fontSize: '9.5px', fontWeight: '800', color: '#1e293b', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px' }}>
              Hazard Handling & Out-of-Order Logic
            </div>
            <div style={{ fontSize: '8.8px', color: '#000', lineHeight: 1.45 }}>
              • <strong>Data Hazards:</strong> Result forwarding, register renaming, and large ROB usage.<br />
              • <strong>Control Hazards:</strong> Speculative execution with sophisticated branch prediction.<br />
              • <strong>Structural Hazards:</strong> Multiple issue units and optimized split Cache hierarchies.
            </div>
          </div>
          <div style={{ padding: '8px', borderLeft: '3px solid var(--accent-rb)', background: '#fffafa', borderRadius: '2px', border: '1px solid var(--border-light)', borderLeftWidth: '3px' }}>
            <div style={{ fontSize: '9.5px', fontWeight: '800', color: 'var(--accent-rb)', marginBottom: '4px' }}>ARMv9.2 Improvements</div>
            <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '8.8px', color: 'var(--text-dark)', lineHeight: 1.5 }}>
              <li>BTI + Global History for hardware-enforced control flow.</li>
              <li>Expanded Reorder Buffer (ROB) window for enhanced ILP.</li>
              <li>SVE2/SME integrated pipelines for vector/matrix ops.</li>
            </ul>
          </div>
        </div>
      </Card>

      <br />

      <Card title="Processors that use ARMv9.2 Architecture" headerClass="ch-blue">
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 5px', gap: '15px' }}>
          <div style={{ textAlign: 'center', flex: 1, overflow: 'hidden' }}>
            <img
              src={snapdragonImg}
              alt="Snapdragon 8 Gen 3"
              style={{ height: '160px', width: '100%', objectFit: 'contain', filter: 'opacity(0.9)', marginBottom: '6px' }}
            />
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#000' }}>Snapdragon 8 Gen 3</div>
            {/* <div style={{ fontSize: '8px', color: '#475569' }}>Category: Mobile</div> */}
          </div>
          <div style={{ flex: 1.2, background: '#fff', border: '1.5px solid #000', borderRadius: '4px', overflow: 'hidden', alignSelf: 'stretch', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: 'var(--accent-rb)', color: '#fff', padding: '4px 8px', fontSize: '10px', fontWeight: '800', textAlign: 'center', letterSpacing: '0.05em' }}>
              SHARED ARMV9.2-A CAPABILITIES
            </div>
            <div style={{ padding: '8px', fontSize: '9px', color: '#000', lineHeight: 1.5 }}>
              <ul style={{ margin: 0, paddingLeft: '14px' }}>
                <li style={{ marginBottom: '3px' }}><strong>Cortex-A720</strong> efficiency cores (Armv9.2-A)</li>
                <li style={{ marginBottom: '3px' }}><strong>SVE2 SIMD</strong> and <strong>SME</strong> matrix acceleration</li>
                <li style={{ marginBottom: '3px' }}><strong>Hardware Security:</strong> RME, PAC, BTI</li>
                <li style={{ marginBottom: '3px' }}>Optimized for mobile AI, gaming, and efficiency</li>
                <li>Supports heterogeneous CPU clusters in SoC implementations</li>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <img
              src={mediaTeckImg}
              alt="MediaTek Dimensity 9300"
              style={{ height: '160px', marginBottom: '6px' }}
            />
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#000' }}>MediaTek Dimensity 9300</div>
            {/* <div style={{ fontSize: '9px', color: '#475569' }}>Category: Cloud</div> */}
          </div>
        </div>
      </Card>

      <div style={{ flex: 1 }}></div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
        <div className="col" style={{ display: 'flex', flexDirection: 'column' }}>
          <Card title="Key Processor Features" headerClass="ch-dark">
            {essentialFeatures.map(([title, desc], idx) => (
              <div className="fi" key={idx} style={{ marginBottom: '4px' }}>
                <div className="fi-t" style={{ fontSize: '9.2px', lineHeight: '1.25' }}>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div className="col" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Card title="References" headerClass="ch-navy">
            <div className="refs" style={{ fontSize: '11px', lineHeight: 1.8, padding: '4px' }}>
              1. <a href="https://developer.arm.com/documentation/ddi0601" style={{ color: 'var(--accent-rb)', textDecoration: 'none' }}>https://developer.arm.com/documentation/ddi0601</a><br />
              2. <a href="https://developer.arm.com/architectures/cpu-architecture/a-profile" style={{ color: 'var(--accent-rb)', textDecoration: 'none' }}>https://developer.arm.com/architectures/cpu-architecture/a-profile</a><br />
              3. <a href="https://www.arm.com/architecture/cpu/neoverse" style={{ color: 'var(--accent-rb)', textDecoration: 'none' }}>https://www.arm.com/architecture/cpu/neoverse</a>
            </div>
          </Card>
          <TeamTable />
        </div>
      </div>
    </div>
  )
}

function StatBox({ label, value }) {
  return (
    <div className="st">
      <div className="sk">{label}</div>
      <div className="sv">{value}</div>
    </div>
  )
}

function CoaArchitecture() {
  const width = 320;
  const centerX = width / 2;

  return (
    <svg viewBox="0 0 320 440" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: "'Inter', sans-serif", border: '1px solid #000', borderRadius: '4px', display: 'block', marginBottom: '5px', background: '#fff' }}>
      <defs>
        <marker id="ab" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
          <path d="M0,0 L5,2 L0,4 Z" fill="#334155" />
        </marker>
      </defs>

      {/* Background Frame */}
      <rect x="2" y="2" width="316" height="436" rx="4" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="3,2" />
      <text x={centerX} y="15" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">ARMv9.2 ARCHITECTURAL DOMAIN</text>

      {/* APPLICATION CORES */}
      <g transform="translate(50, 24)">
        <rect x="0" y="0" width="220" height="38" rx="3" fill="#f8fafc" stroke="#334155" strokeWidth="1.2" />
        <text x="110" y="16" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="900">APPLICATION CORE</text>
        <text x="110" y="29" textAnchor="middle" fill="#64748b" fontSize="7.2" fontWeight="700">AArch64 · EL0–EL3 · Non-Secure / Secure / Realm</text>
      </g>

      <g transform="translate(50, 68)">
        <rect x="0" y="0" width="220" height="38" rx="3" fill="#f8fafc" stroke="#334155" strokeWidth="1.2" />
        <text x="110" y="16" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="900">APPLICATION CORE</text>
        <text x="110" y="29" textAnchor="middle" fill="#64748b" fontSize="7.2" fontWeight="700">AArch64 · EL0–EL3 · Non-Secure / Secure / Realm</text>
      </g>

      {/* SHARED CLUSTER LOGIC (DSU) */}
      <g transform="translate(60, 115)">
        <rect x="0" y="0" width="200" height="24" rx="3" fill="#ffffff" stroke="#475569" strokeWidth="1.2" />
        <text x="100" y="15" textAnchor="middle" fill="#334155" fontSize="9" fontWeight="900">SHARED CLUSTER LOGIC (DSU)</text>
      </g>

      <line x1={centerX} y1="62" x2={centerX} y2="68" stroke="#94a3b8" strokeWidth="1" />
      <line x1={centerX} y1="106" x2={centerX} y2="115" stroke="#94a3b8" strokeWidth="1" />

      {/* COHERENT INTERCONNECT */}
      <g transform="translate(35, 148)">
        <rect x="0" y="0" width="250" height="40" rx="3" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
        <text x="125" y="18" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="900">COHERENT INTERCONNECT (AMBA CHI / ACE)</text>
        <text x="125" y="31" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="700">Snoop Control · Hardware Coherency</text>
      </g>

      <line x1={centerX} y1="139" x2={centerX} y2="148" stroke="#1e293b" strokeWidth="1.2" />

      {/* RME */}
      <g transform="translate(50, 198)">
        <rect x="0" y="0" width="220" height="48" rx="3" fill="#f8fafc" stroke="#475569" strokeWidth="1.2" />
        <text x="110" y="15" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="900">REALM MANAGEMENT EXTENSION (RME)</text>
        <text x="110" y="28" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="700">ROOT · REALM · SECURE · NON-SECURE</text>
        <text x="110" y="40" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="500">Confidential Compute Architecture</text>
      </g>

      <line x1={centerX} y1="188" x2={centerX} y2="198" stroke="#64748b" strokeWidth="1.2" markerEnd="url(#ab)" />

      {/* SYSTEM MMU */}
      <g transform="translate(50, 256)">
        <rect x="0" y="0" width="220" height="38" rx="3" fill="#ffffff" stroke="#475569" strokeWidth="1.2" />
        <text x="110" y="15" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="900">SYSTEM MMU / VIRTUALIZATION</text>
        <text x="110" y="29" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="700">STAGE-2 TRANSLATION (VMSAv8-64)</text>
      </g>

      <line x1={centerX} y1="246" x2={centerX} y2="256" stroke="#475569" strokeWidth="1.2" />

      {/* MAIN MEMORY */}
      <g transform="translate(50, 304)">
        <rect x="0" y="0" width="220" height="38" rx="3" fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
        <text x="110" y="15" textAnchor="middle" fill="#475569" fontSize="9.5" fontWeight="900">MAIN MEMORY / SYSTEM</text>
        <text x="110" y="29" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="700">Up to 52-bit Physical Address (PA)</text>
      </g>

      <line x1={centerX} y1="294" x2={centerX} y2="304" stroke="#94a3b8" strokeWidth="1.2" />

      {/* DEBUG */}
      <g transform="translate(35, 352)">
        <rect x="0" y="0" width="250" height="42" rx="3" fill="#ffffff" stroke="#475569" strokeWidth="1.2" />
        <text x="125" y="18" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="900">PMU · DEBUG & TRACE ARCHITECTURE</text>
        <text x="125" y="32" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="700">Architectural Performance Monitoring & CoreSight</text>
      </g>

      <line x1={centerX} y1="342" x2={centerX} y2="352" stroke="#475569" strokeWidth="1.2" />
    </svg>
  );
}

function CoaRegisters() {
  const width = 320;
  const centerX = width / 2;

  return (
    <svg viewBox="0 0 320 100" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: "'Inter', sans-serif", border: '1px solid #000', borderRadius: '4px', display: 'block', marginBottom: '5px', background: '#fff' }}>
      {/* Label for 64-bit register */}
      <text x={centerX} y="15" textAnchor="middle" fill="#475569" fontSize="9" fontWeight="900">64-BIT Xn REGISTER (AArch64)</text>

      {/* 64-bit Register Box */}
      <rect x="15" y="22" width="290" height="20" rx="2" fill="#f8fafc" stroke="#334155" strokeWidth="1.2" />

      <line x1={centerX} y1="22" x2={centerX} y2="42" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2" />

      <text x="88" y="35" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="800">[63 : 32]</text>
      <text x="232" y="35" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="800">[31 : 0]</text>

      {/* Label for 32-bit alias */}
      <text x={centerX} y="58" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="900">32-BIT Wn ALIAS (Lower Half)</text>

      <rect x="90" y="64" width="140" height="16" rx="2" fill="#ffffff" stroke="#64748b" strokeWidth="1.2" />
      <text x={centerX} y="75" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">[31 : 0]</text>

      <text x={centerX} y="92" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="700" fontStyle="italic">* WRITES TO Wn ZERO-EXTEND TO THE FULL 64-BIT Xn REGISTER</text>
    </svg>
  )
}

import datapathImg from './assets/datapath_extracted.png';
import snapdragonImg from './assets/snapdragon.png';
import mediaTeckImg from './assets/mediatek.png';

function CoaDatapath() {
  return (
    <div style={{ background: '#fff', padding: '15px', borderRadius: '4px', border: '1.5px solid #000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img
        src={datapathImg}
        alt="AArch64 Instruction Datapath"
        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
}

function RegisterTable() {
  return (
    <table className="rt">
      <thead>
        <tr>
          <th>Register</th>
          <th>Alias</th>
          <th>Purpose</th>
        </tr>
      </thead>
      <br />
      <tbody>
        {[
          ["X0 – X7", "W0–W7", "Function arguments & return values"],
          ["X8 – X18", "W8–W18", "Caller-saved temporaries (X16/X17 = IP0/IP1)"],
          ["X19 – X28", "W19–W28", "Callee-saved (preserved across calls)"],
          ["X29 / X30", "FP / LR", "Frame Pointer / Link Register"],
          ["V0 – V31", "Q/D/S/H/B views", "SIMD & FP (128-bit registers)"],
          ["Z0 – Z31", "–", "SVE2 scalable vectors (128–2048 bits, implementation-defined)"],
          ["ZA Tile", "—", "SME matrix accumulator array"]
        ].map(([reg, alias, purpose], idx) => (
          <tr key={idx} >
            <td className="rn">{reg}</td>
            <td>{alias}</td>
            <td>{purpose}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
function InstructionTypeTable() {
  return (
    <table className="rt">
      <thead>
        <tr>
          <th>Category</th>
          <th>Instruction Example</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        {[
          ["Integer", "ADD X0, X1, X2", "X0 = X1 + X2"],
          ["Logical", "AND W3, W4, #0xFF", "Bitwise AND using logical immediate mask"],
          ["Shift", "LSR X5, X6, #2", "Logical right shift (÷4)"],
          ["Move", "MOV X7, #42", "Load immediate constant into register (alias of MOVZ/MOVN)"],
          ["Load", "LDR X8, [X9]", "64-bit load from memory address"],
          ["Store", "STR W10, [SP, #4]", "32-bit store to stack with immediate offset"],
          ["Branch", "CBZ W2, label", "Compare and branch if register equals zero"],
          ["SIMD / FP", "FADD S0, S1, S2", "FP scalar addition"],
          ["SVE2", "ADD Z0.S, Z1.S, Z2.S", "Scalable vector integer add"],
          ["System", "MRS X0, CTR_EL0", "Read system register to GPR"]
        ].map(([cat, ex, op], idx) => (
          <tr key={idx}>
            <td className="rn">{cat}</td>
            <td>{ex}</td>
            <td>{op}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ISAClarification() {
  return (
    <div className="isa-info-grid">
      <div className="isa-info-box">
        <div className="isa-info-title">Immediate & Offset Ranges</div>
        <div className="isa-info-content">
          <ul>
            <li>Arithmetic: 12-bit (opt. shifted)</li>
            <li>Load/Store: Scaled by access size</li>
            <li>Branch: PC-relative offsets</li>
          </ul>
        </div>
      </div>

      <div className="isa-info-box">
        <div className="isa-info-title">Condition Flags (NZCV)</div>
        <div className="isa-info-content">
          <div className="nzcv-tag-grid">
            <div className="nzcv-tag" style={{ border: '1px solid var(--border-light)', color: 'var(--text-dark)' }}><strong>N</strong> Neg</div>
            <div className="nzcv-tag" style={{ border: '1px solid var(--border-light)', color: 'var(--text-dark)' }}><strong>Z</strong> Zero</div>
            <div className="nzcv-tag" style={{ border: '1px solid var(--border-light)', color: 'var(--text-dark)' }}><strong>C</strong> Carry</div>
            <div className="nzcv-tag" style={{ border: '1px solid var(--border-light)', color: 'var(--text-dark)' }}><strong>V</strong> Oflw</div>
          </div>
          <p style={{ fontSize: '8.5px', marginTop: '2px', color: '#64748b' }}>Used by CMP & Conditional Branches</p>
        </div>
      </div>

      <div className="isa-info-box">
        <div className="isa-info-title">Load/Store ISA Model</div>
        <div className="isa-info-content">
          <p style={{ fontSize: '9.2px', lineHeight: 1.25 }}>
            Memory is accessed <b>only</b> via load/store instructions. ALU instructions operate on <b>registers only</b>.
          </p>
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    // <div className="footer">
    <></>
    // </div>
  )
}

function TeamTable() {
  return (
    <div className="team-card">
      <div style={{ background: '#FFE600', color: '#000', padding: '5px', textAlign: 'center', fontSize: '13px', fontWeight: '900', borderBottom: '2px solid #000' }}>B.Tech CSE 2024–28 Batch : Semester 4</div>
      <div style={{ background: '#fff', color: '#000', padding: '3px', textAlign: 'center', fontSize: '12px', fontWeight: '700', borderBottom: '1.5px solid #000' }}>23CSE213 Computer Organization and Architecture</div>
      <div style={{ padding: '4px 8px', fontSize: '14px', fontWeight: '800', borderBottom: '1.5px solid #000', textAlign: 'left' }}>Team No : C10</div>
      <table className="team-tbl">
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Roll No</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>CB.SC.U4CSE24240</td><td>P SANJAY</td></tr>
          <tr><td>CB.SC.U4CSE24241</td><td>P BHAVITH MADHU</td></tr>
          <tr><td>CB.SC.U4CSE24243</td><td>RAGHAV VS</td></tr>
          <tr><td>CB.SC.U4CSE24244</td><td>R VIKRANTH</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default App

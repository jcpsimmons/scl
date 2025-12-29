import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Statusline } from './statusline';

describe('Statusline', () => {
  it('renders with default props', () => {
    render(<Statusline />);
    expect(screen.getByText('NORMAL')).toBeInTheDocument();
  });

  it('displays mode', () => {
    render(<Statusline mode="INSERT" />);
    expect(screen.getByText('INSERT')).toBeInTheDocument();
  });

  it('displays filename', () => {
    render(<Statusline filename="test.ts" />);
    expect(screen.getByText('test.ts')).toBeInTheDocument();
  });

  it('displays modified indicator', () => {
    render(<Statusline filename="test.ts" modified />);
    expect(screen.getByText('[+]')).toBeInTheDocument();
  });

  it('displays readonly indicator', () => {
    render(<Statusline filename="test.ts" readonly />);
    expect(screen.getByText('[RO]')).toBeInTheDocument();
  });

  it('displays branch', () => {
    render(<Statusline branch="main" />);
    expect(screen.getByText('main')).toBeInTheDocument();
  });

  it('displays line and column', () => {
    render(<Statusline line={10} column={5} />);
    expect(screen.getByText('10:5')).toBeInTheDocument();
  });

  it('displays filetype', () => {
    render(<Statusline filetype="typescript" />);
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('displays encoding', () => {
    render(<Statusline encoding="utf-16" />);
    expect(screen.getByText('utf-16')).toBeInTheDocument();
  });

  it('calculates percentage from line and totalLines', () => {
    render(<Statusline line={50} totalLines={100} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('displays Top when at first line', () => {
    render(<Statusline line={1} totalLines={100} />);
    expect(screen.getByText('Top')).toBeInTheDocument();
  });

  it('displays Bot when at last line', () => {
    render(<Statusline line={100} totalLines={100} />);
    expect(screen.getByText('Bot')).toBeInTheDocument();
  });

  it('uses custom percentage over calculated', () => {
    render(<Statusline line={50} totalLines={100} percentage="Custom" />);
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('renders custom left content', () => {
    render(<Statusline leftContent={<span>Left</span>} />);
    expect(screen.getByText('Left')).toBeInTheDocument();
  });

  it('renders custom center content', () => {
    render(<Statusline centerContent={<span>Center</span>} />);
    expect(screen.getByText('Center')).toBeInTheDocument();
  });

  it('renders custom right content', () => {
    render(<Statusline rightContent={<span>Right</span>} />);
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Statusline className="custom-class" data-testid="statusline" />);
    expect(screen.getByTestId('statusline')).toHaveClass('custom-class');
  });
});
